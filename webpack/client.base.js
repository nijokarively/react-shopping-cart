const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack');
const path = require('path');
const WebpackBar = require('webpackbar');

const config = require('../config');
const loaders = require('./loaders.config');
const DEV = !config.isProduction;
const PROD = !DEV;

module.exports = {
    mode: 'development',
    target: 'web',
    devtool: 'eval',
    entry: config.rootPath('src/index.js'),

    output: {
        pathinfo: false, // perf boost
    },

    resolve: {
        extensions: [ '*', '.js', '.jsx', '.webpack.js', '.web.js', '.mjs', '.json' ],
        modules: [
            'node_modules',
            config.rootPath('src'),
        ],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
    },

    module: {
        strictExportPresence: true,
        rules: [
            loaders.mjs,
            loaders.js,
            loaders.css,
            loaders.stylusGlobal,
            loaders.stylusModule,
            loaders.raw,
        ],
    },

    optimization: {
        runtimeChunk: true,
        splitChunks: {
            chunks: 'all',
        },
    },

    plugins: [
        new WebpackBar(),
        new HtmlWebpackPlugin({
            inject: true,
            template: './src/index.html',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"',
            'process.env.IS_CLIENT': 'true',
        }),
    ],
};
