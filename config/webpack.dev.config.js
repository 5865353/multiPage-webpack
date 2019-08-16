/**
 * webpack 开发环境下的配置
 */
'use strict'

const webpack = require('webpack')
const path = require('path')
let baseConfig = require("./webpack.base.config")
const merge = require('webpack-merge')
// 友好提示插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
let host = "localhost"
let port = 9000
let webpackConfig = {
    mode: 'none',
    module: {
        rules: [
            {
                //判断是否是css文件
                test: /\.(sa|sc|c)ss$/,
                //不用在指定文件设置loader
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }

        ]
    },

    // 开发环境下服务器的配置
    devServer: {
        host,
        contentBase: path.join(__dirname, "dist"),
        compress: true,     // 开启gzip压缩
        port,
        quiet: true
    },
    plugins: [
        // 热更新
        new webpack.HotModuleReplacementPlugin()

    ]
}
let devCfg = merge(baseConfig, webpackConfig)


let info = ''
for (let i in devCfg.entry) {
    info += `\r\n\t\t\t http://${host}:${port}/${i}.html `

}
devCfg.plugins.push(new FriendlyErrorsPlugin({
    // 运行成功
    compilationSuccessInfo: {
        messages: [`Your application is running here: http://${host}:${port} \r\n\t 生成的静态页面:${info}`]
    }
}))
module.exports = devCfg