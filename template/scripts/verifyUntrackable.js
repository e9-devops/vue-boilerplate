/* eslint no-console: 0 */
const chalk = require('chalk');

console.log(process.argv);
if (process.argv[0]) {
    console.error(
        `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
            '.env files must not be trackable.'
        )}\n\n`
    );
    process.exit(1);
}
