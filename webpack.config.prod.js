/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const sharedConfig = require('./webpack.config.shared');

module.exports = {
  name: 'prod-config',

  entry: {
    common: [
      './app/client/entry.jsx',
    ],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'axios',
      'lodash',
      'redux',
    ],
  },
  
  resolve: sharedConfig.resolve,

  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: '[name].[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    publicPath: '/dist/',
    pathinfo: false,
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      comments: false,
      sourceMap: false,
      mangle: true,
      minimize: true,
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.[hash].bundle.js',
    }),

    // build handlebars templates
    new HtmlWebpackPlugin({
      hash: true,
      template: './templates/index.handlebars',
      inject: false,
      filename: 'index.handlebars',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './templates/error.handlebars',
      inject: false,
      filename: 'error.handlebars',
      minify: {
        collapseWhitespace: true,
      },
    }),
    new ExtractTextPlugin('styles.[chunkhash].css'),
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'app'),
        exclude: 'node_modules',
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loaders: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader!sass-loader?indentedSyntax=false&sourceMap=false',
        }),
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader?name=[name].[chunkhash].[ext]',
      },
    ],
  },
};
