const path = require('path')
const resolve = (dir) => path.join(__dirname, dir)
module.exports = {
  // 发布路径，发布到服务端需要和其他项目区分开
  publicPath: process.env.NODE_ENV === 'production'
    ? '/pc/'
    : '/',
  devServer: {
    proxy: 'http://localhost:7001'
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'))
      .set('@views', resolve('src/views'))
      .set('@components', resolve('src/components'))
      .set('@constants', resolve('src/constants'))
      .set('@config', resolve('src/config'))
      .set('@store', resolve('src/store'))
    return config
  }
}
