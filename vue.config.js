const CompressionPlugin = require('compression-webpack-plugin');
let url = 'http://10.120.1.171:3000' || 'http://47.93.117.110:3000'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: url,
                changeOrigin: true,
                "secure": false,
                pathRewrite: {
                    '^/api': '',

                }

            }
        }
    },
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
    configureWebpack: ({
        plugins: [new CompressionPlugin({
            test: /\.js$|\.html$|\.css/,
            threshold: 1000,
            deleteOriginalAssets: false
        }),new BundleAnalyzerPlugin()],
        externals: { // 使用cdn的形式引入这些苦  减少vendor 打包体积，增加渲染熟读； cdn引入的标签写入body内
            'vue': 'Vue', //暴露变了Vue    
            'vue-router': 'VueRouter',
            'element-ui': 'ELEMENT',
            'vuex':'Vuex'
        },
        optimization: {
            concatenateModules: false,
            splitChunks: { //分割代码块
                maxInitialRequests: 6, //默认是5
                cacheGroups: {
                    vendor: {
                        //第三方依赖
                        priority: 1,
                        name: 'vendor',
                        test: /node_modules/,
                        chunks: 'initial',
                        minSize: 100,
                        minChunks: 1 //重复引入了几次
                    },

                    //...
                }
            },
        },
    })

};