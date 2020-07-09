const webpackOptions = {
    publicPath: '/',
    lintOnSave: true,
    configureWebpack: {
        devtool: 'eval' // this is needed to debug in browser
    },
    css: {
        loaderOptions: {
            scss: {
                /* Add any other functions, mixins or variables here to globally initialise the app */
                prependData: `
				@import "~@/scss/variables.scss";
				`
            }
        }
    },
    pages: {
        login: {
            entry: './src/webapp/login/login.js',
            template: 'public/index.html',
            filename: 'index.html'
        },
        app: {
            entry: './src/webapp/app/main.js',
            template: 'public/app/index.html',
            filename: 'app/index.html'
        }
    },
    runtimeCompiler: true
};

/* Change the production path especially when you need some prefix before your actual root path */
if (process.env.NODE_ENV === 'production' ) {
    const CompressionPlugin = require('compression-webpack-plugin');
    const Zopfli = require('@gfx/zopfli');
    const IS_VENDOR = /[\\/]node_modules[\\/]/;
    webpackOptions.chainWebpack = config => {
        config.optimization.splitChunks({
            minSize: 10000,
            maxSize: 0,
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                    priority: -10,
                    minChunks: 2,
                    chunks: 'async',
                    minSize: 0,
                    maxSize: 250000, // Google suggests keeping max size as 250KB for asynchronous chunks
                    test: IS_VENDOR,
                    enforce: true
                }
            }
        });
    };
    webpackOptions.configureWebpack.devtool = 'none';
    webpackOptions.configureWebpack.plugins.push(
        new CompressionPlugin({
            compressionOptions: {
                numiterations: 15,
                level: 9
            },
            algorithm(input, compressionOptions, callback) {
                return Zopfli.gzip(input, compressionOptions, callback);
            }
        })
    );
    webpackOptions.pages.login.chunks = ['chunk-vendors', 'login'];
    webpackOptions.pages.app.chunks = ['chunk-vendors', 'app'];
}

module.exports = webpackOptions;
