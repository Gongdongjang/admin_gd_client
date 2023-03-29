const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://3.37.223.12:5000/',
            changeOrigin: true
        })
    )
}
