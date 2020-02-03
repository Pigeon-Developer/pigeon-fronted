const path = require('path')
const webpackMerge = require('webpack-merge')

const customConfig = {
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
    },
  },
}

module.exports = function override(config, env) {
  return webpackMerge(config, customConfig)
}