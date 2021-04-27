const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const config = require('../config');

module.exports = merge(require('./client.base'), {
    mode: 'development',
    target: 'web',

    output: {
        pathinfo: true,
        path: config.rootPath('dist/dev') + '/',
        publicPath: '/',
        filename: 'assets/main.[hash].js',
        chunkFilename: 'assets/[name].[chunkhash].js',
        // Point sourcemap entries to original disk location (format as URL on Windows)
        devtoolModuleFilenameTemplate: info =>
            path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
    },

    devServer: {
        port: config.devServerPort,
        disableHostCheck: true,
        contentBase: './dist',
        hot: true,
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:' + config.serverPort,
        },
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
});
