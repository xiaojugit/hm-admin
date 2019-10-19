'use strict';
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './src/main.js',
    devtool: "source-map",
    output: {
        filename: 'app.[hash].js',
        path: path.resolve(__dirname, '../dist/')
    },
    resolve: {
        alias: {
            // 'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, '..', 'src'),
            '_c': path.resolve(__dirname, '..', 'src/components'),
        }
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: "babel-loader",
            // exclude: /node_modules/,
            // include: [path.join(__dirname, '..', 'src')],
            // options: {
            //     presets: ['@babel/preset-env']
            // }
        },
            {
                enforce: 'pre',
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                exclude: /node_modules/,
                include: [path.join(__dirname, '..', 'src')],
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
                include: [path.join(__dirname, '..', 'src')],
                options: {
                    loaders: {
                        css: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                            'postcss-loader'
                        ],
                        less: [
                            'vue-style-loader',
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true,
                                },
                            },
                            'postcss-loader',
                            {
                                loader: 'less-loader',
                                options: {
                                    sourceMap: true,
                                    javascriptEnabled: true
                                },
                            },
                        ],
                    },
                    postLoaders: {
                        html: 'babel-loader?sourceMap'
                    },
                    sourceMap: true,
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: devMode //process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    'postcss-loader'
                ],
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: devMode //process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10000,
                    // name: path.posix.join('', '[name].[hash:7].[ext]')
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
    ]
};