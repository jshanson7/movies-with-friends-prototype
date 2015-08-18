'use strict';

const assign = require('lodash/object/assign');
const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer-core');
const csswring = require('csswring');
const bem = require('postcss-bem');
const mixins = require('postcss-mixins');
const nested = require('postcss-nested');
const simpleVars = require('postcss-simple-vars');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config');
const publicPath = '/' + config.outputDir + '/';
const eslint = {
  test: /\.jsx?$/,
  loader: 'eslint-loader',
  include: path.join(__dirname, config.inputDir)
};
const cssLoader = {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style-loader', ['css-loader', 'postcss-loader', 'cssnext-loader'].join('!')),
  include: path.join(__dirname, config.inputDir)
};
const common = {
  output: {
    path: path.join(__dirname, config.outputDir),
    filename: config.outputFile + '.js',
    publicPath: publicPath
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  },
  postcss: [simpleVars({ silent: true }), bem({ style: 'bem', separators: { modifier: '--' } }), mixins, nested, autoprefixer/*, csswring*/]
};
const development = assign({}, common, {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://' + config.host + ':' + config.port,
    'webpack/hot/only-dev-server',
    config.entry
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin(config.outputFile + '.css')
  ],
  module: {
    preLoaders: [eslint],
    loaders: [
      cssLoader,
      {
        test: /\.jsx?$/,
        loaders: ['source-map-loader', 'react-hot', 'babel'],
        include: path.join(__dirname, config.inputDir)
      }
    ]
  },
  devServer: {
    publicPath: publicPath,
    hot: true
  }
});
const production = assign({}, common, {
  entry: [config.entry],
  plugins: [
    new webpack.optimize.UglifyJsPlugin({ output: { comments: false } }),
    new ExtractTextPlugin(config.outputFile + '.css')
  ],
  module: {
    preLoaders: [eslint],
    loaders: [
      cssLoader,
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.join(__dirname, config.inputDir)
      }
    ]
  }
});

module.exports = { development: development, production: production }[config.env];
