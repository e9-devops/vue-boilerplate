/* eslint no-console: 0 */

/********************* Mandatory Env Variables ******************/
// SERVERHOST=x.x.x.x
// USERNAME=appadmin
// SSHKEY=/Users/johndoe/.ssh/id_rsa
// DESTINATION=/var/www/helloworld
// FOLDERNAME=dist
/****************************************************************/

// Note: Always try to run this file with new build. This script doesn't clean or flush your dist.

const path = require('path');
const args = require('minimist')(process.argv.slice(2));

if (!args['environment'] || ['staging', 'production'].indexOf(args['environment']) === -1) {
    process.stdout.write('environment arg is missing or incorrect. Please either pass production or staging as environment argument');
    process.exit(1);
} else {
    require('dotenv').config({
        path: path.join(__dirname, `/../.env.${args['environment']}`)
    });
    const chalk = require('chalk');
    const fs = require('fs');
    const node_ssh = require('node-ssh');
    const ssh = new node_ssh();
    const folderPath = path.join(__dirname + '/../' + process.env.FOLDERNAME); //Users/sharvilak/sites/flext-web/dist
    try {
        if (process.env.FOLDERNAME && fs.existsSync(folderPath) && process.env.DESTINATION && process.env.SERVERHOST && process.env.USERNAME && process.env.SSHKEY) {
            let animation;
            ssh.connect({
                host: process.env.SERVERHOST,
                username: process.env.USERNAME,
                privateKey: process.env.SSHKEY
            }).then(
                () => {
                    const failed = [];
                    animation = animate();
                    ssh.putDirectory(folderPath, process.env.DESTINATION, {
                        recursive: true,
                        concurrency: 10,
                        tick: (localPath, remotePath, error) => {
                            if (error) {
                                failed.push(localPath);
                            }
                        }
                    }).then(
                        status => {
                            clearInterval(animation);
                            console.log(status ? chalk.green('SUCCESSFUL ✅') : chalk.red('FAILED 🤕'));
                            if (failed.length) {
                                const Promise = require('bluebird');
                                Promise.almost = r => Promise.all(r.map(p => (p.catch ? p.catch(e => e) : p)));

                                console.log('\nFollowing files were failed 📂');
                                const queue = [];
                                failed.forEach(path => {
                                    console.log(chalk.red(path));
                                    queue.push(pushFailedFile(path, ssh, folderPath));
                                });

                                // Retry Logic with putFile
                                console.log('\nRetrying... 📡  \n');
                                Promise.almost(queue).then(result => {
                                    clearInterval(animation);
                                    let success = 0;
                                    result.forEach(r => {
                                        if (r) {
                                            console.log(chalk.red(r + ' couldn\'t be deployed for some reason. Please copy it manually'));
                                        } else {
                                            success++;
                                        }
                                    });
                                    let statusCode = 1;
                                    ssh.dispose();
                                    if (success === queue.length) {
                                        console.log(chalk.green('Retries have been successful 🚀 ✅ '));
                                        statusCode = 0;
                                    }
                                    process.exit(statusCode);
                                });
                            } else {
                                ssh.dispose();
                                console.log(chalk.green('SUCCESSFUL ✅'));
                                process.exit(0);
                            }
                        },
                        err => {
                            clearInterval(animation);
                            console.log(`  ${chalk.red(' ERROR ')} ${chalk.red('There was an unexpected error due to some reason 🤕')}\n\n`);
                            console.error(err);
                            ssh.dispose();
                            process.exit(0);
                        }
                    );
                },
                err => {
                    console.log(`  ${chalk.red(' ERROR ')} ${chalk.red('There was an error connecting to the Host 🤕')}\n\n`);
                    console.error(err);
                    ssh.dispose();
                    clearInterval(animation);
                    process.exit(0);
                }
            );
        } else {
            console.log(`  ${chalk.red(' ERROR ')} ${chalk.red('Required env variables are missing. Please check the env variables 🤷‍')}\n\n`);
            process.exit(0);
        }
    } catch (err) {
        console.error(err);
        process.exit(0);
    }
}

const animate = () => {
    const sign = ['\\', '|', '/', '-'];
    let x = 0;
    process.stdout.write('Please wait while we deploy your build... \n');
    return setInterval(() => {
        process.stdout.write('\r' + sign[x++]);
        x &= 3;
    }, 250);
};

const pushFailedFile = (path, ssh, folderPath) => {
    return new Promise((resolve, reject) => {
        ssh.putFile(path, process.env.DESTINATION + path.replace(folderPath, '')).then(
            () => {
                resolve();
            },
            () => {
                reject(path);
            }
        );
    });
};
