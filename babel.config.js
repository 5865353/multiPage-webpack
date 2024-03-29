/**
 * // targets, useBuiltIns 等选项用于编译出兼容目标环境的代码
 // 其中 useBuiltIns 如果设为 "usage"
 // Babel 会根据实际代码中使用的 ES6/ES7 代码，以及与你指定的 targets，按需引入对应的 polyfill
 // 而无需在代码中直接引入 import '@babel/polyfill'，避免输出的包过大，同时又可以放心使用各种新语法特性。
}*/
module.exports = {
    presets: [
        ["@babel/preset-env", {
            "modules": false,
            "targets": {
                "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
            },
            "useBuiltIns": "usage",
            "corejs": 3
        }]
    ],
    plugins: [
        "@babel/plugin-transform-runtime"
    ]
}
