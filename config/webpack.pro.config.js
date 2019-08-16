/**
 * webpack 上线打包配置
 * @type {{}}
 */
'use strict'

const webpack = require('webpack')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
let baseConfig = require("./webpack.base.config")
const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 分离 css插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')//压缩css插件


let webpackConfig = {
    mode: 'production',
    module: {
        rules: [
            {
                //判断是否是css文件
                test: /\.(sa|sc|c)ss$/,
                //不用在指定文件设置loader
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new OptimizeCssAssetsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css',
        })
    ],
    optimization: {
        minimizer: [
            new UglifyPlugin({
                uglifyOptions: {
                    compress: {
                        drop_console: true, // console
                        drop_debugger: false,
                        pure_funcs: ["console.log"] // 移除console
                    }
                }
            })
        ]
    }
}

module.exports = merge(baseConfig, webpackConfig)