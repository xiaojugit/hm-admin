'use strict';
require('./check-versions')();
const path = require('path');
const webpackBaseConf = require('./webpack.base.conf');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const merge = require('webpack-merge');

module.exports = merge(webpackBaseConf, {
    // mode: 'development',
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
    ]
});