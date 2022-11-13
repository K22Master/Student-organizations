const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 配置代理
  devServer: {
    // 自动打开
    open: true,
    host: 'localhost',
    // 代理
    proxy: {
      '/sys': {
        // 目标服务器
        target: 'http://localhost:3000/sys/',
        // 允许跨域
        changeOrigin: true,
        pathRewrite: {
          '^/sys': '',
        }
      }
    }
  }
})
