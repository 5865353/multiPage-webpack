/**
 * webpack 的基础配置
 */
'use strict'
const path = require("path")
const pageConfig = require("./page.config")
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 分离 css插件


function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

let entry = {}
let htmls = []

pageConfig.forEach((item, index) => {
    entry[item.filename] = resolve(item.path.replace("page", "./src/pages"))
    htmls.push(new HtmlWebpackPlugin({
        title: item.title,
        filename: item.filename + ".html",
        template: item.template ? resolve(item.template) : resolve("public/index.html"), // 模板
        favicon: item.favicon ? resolve(item.favicon) : resolve("public/favicon.ico"),  //ico 图标
        chunks: [item.filename, "common", "vendor"]
    }))
})
module.exports = {
    // 入口
    entry,
    // 出口
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
            },
            // {
            //     //判断是否是scss文件
            //     test: /\.scss$/, // /\.(sa|sc|c)ss$/
            //     //不用在指定文件设置loader
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'sass-loader',
            //         'postcss-loader'
            //     ],
            // }
        ]
    },
    // 配置
    resolve: {
        // 用于查找模块的目录
        extensions: [".js", ".css"],
        alias: {
            '@': resolve('src'),
            'public': resolve('public'),
            'page': resolve('./src/pages')
        }
    },
    externals: {
        //jquery: "jQuery"
    },
    plugins: [
        ...htmls,
        /*new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })*/
    ]

}
