const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('babel-minify-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new BabelMinifyWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'PORT': JSON.stringify('6680'),
        'SERVER_URL': JSON.stringify('http://localhost:6680')
      }
    })
  ]
})
