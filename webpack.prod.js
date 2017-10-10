const webpack = require('webpack');
const merge = require('webpack-merge');
const BabelMinifyWebpackPlugin = require('babel-minify-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new BabelMinifyWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'SERVER_URL': JSON.stringify(process.env.SERVER_URL)
      }
    })
  ]
})
