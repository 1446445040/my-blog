const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const LodashWebpackPlugin = require('lodash-webpack-plugin')

module.exports = {
  configureWebpack: config => {
    Object.assign(config.optimization.splitChunks.cacheGroups, {
      'view-design': { // 分离组件库
        name: true,
        test: /[\\/]view-design[\\/]/,
        priority: 10,
        chunks: 'initial'
      },
      vue: { // 分离vue全家桶
        name: true,
        test: /[\\/]vue(.+?)[\\/]/,
        priority: 5,
        chunks: 'initial'
      }
    })
    config.module.rules.push({
      test: /\.worker\.js$/,
      use: {
        loader: 'worker-loader',
        options: {
          name: '[name]:[hash:8].js'
        }
      }
    })
    config.plugins.push(
      new LodashWebpackPlugin()
    )
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.externals({
        marked: 'marked'
      })
      config.plugin('analyzer').use(BundleAnalyzer).end()
      config.plugin('compress').use(CompressionWebpackPlugin, [{
        test: /\.js$|\.html$|\.css$/,
        threshold: 10240, // 超过10kb就压缩
        deleteOriginalAssets: false
      }])
    }
  }
}
