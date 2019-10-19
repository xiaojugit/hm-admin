'use strict';
const path = require('path');
const webpackBaseConf = require('./webpack.base.conf');
const merge = require('webpack-merge');

module.exports = merge(webpackBaseConf, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, "../dist"), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        host: '127.0.0.1',
        open: true,
        https: false, // true for self-signed, object for cert authority
        noInfo: false, // only errors & warns on hot reload
        stats: "minimal",
        // progress: true,
        port: 8501,
        proxy: { // proxy URLs to backend development server
            '/api': 'http://localhost:3000',
            "/api2": {
                target: "http://localhost:3000",
                pathRewrite: {
                    "^/api2": ""
                }
            }
        },
    }
});