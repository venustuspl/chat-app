// vue.config.js
module.exports = {
    // https://cli.vuejs.org/config/#devserver-proxy
    devServer: {
        port: 3000,
        proxy: {
            '/chat': {
                target: 'http://localhost:8081',
                ws: true,
                changeOrigin: true
            }
        }
    }
}