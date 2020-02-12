const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const LodashWebpackPlugin = require('lodash-webpack-plugin')

module.exports = {
  configureWebpack: config => {
    config.module.rules.push({
      test: /\.worker\.js$/,
      use: {
        loader: 'worker-loader',
        options: {
          name: '[name]:[hash:8].js'
        }
      }
    })
  },
  chainWebpack: config => {
    config.optimization.splitChunks({
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'all',
          minSize: 20,
          minChunks: 2
        }
      }
    })
    config.plugin('lodash').use(LodashWebpackPlugin).end()
    if (process.env.NODE_ENV === 'production') {
      config.externals({
        marked: 'marked',
        moment: 'moment',
        vue: 'Vue',
        jquery: '$',
        'vue-router': 'VueRouter',
        'highlight.js': 'hljs',
        'element-ui': 'ELEMENT'
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
