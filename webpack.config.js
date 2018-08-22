const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: ['./src/index'],
  devtool: 'sourcemap',
  target: 'node',
  externals: [
    nodeExternals()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ['env']
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js'
  }
}
