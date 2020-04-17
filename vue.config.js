const CompressionPlugin = require('compression-webpack-plugin');
module.exports = {
    lintOnSave: false,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [new CompressionPlugin({
                    test: /\.js$|\.html$|\.css/,
                    threshold: 1000,
                    deleteOriginalAssets: false
                })]
            }
        }
    }
};