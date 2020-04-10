const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware('/api', {
      target: "https://powerful-falls-31436.herokuapp.com/",
      changeOrigin: true
    })
  );

};