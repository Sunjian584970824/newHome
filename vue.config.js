const debug = process.env.NODE_ENV !== 'production'
module.exports = {
    lintOnSave: false,
    css: {
        sourceMap: true, // 开启 CSS source maps
    },
    devServer: {
        open: true, //配置自动启动浏览器,
        hot: true,
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://10.120.1.171:3000', //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        }
    },
}