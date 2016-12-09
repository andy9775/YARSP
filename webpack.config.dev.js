/* eslint-disable */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const sharedConfig = require('./webpack.config.shared');

const HMR_PORT = process.env.HMR_PORT || 3001;
const SERVER_PORT = process.env.SERVER_PORT || 3000;

module.exports = {
  name: 'dev-config',

  devtool: 'eval-source-map',

  entry: {
    common: [
      'webpack/hot/dev-server',
      `webpack-dev-server/client?http://localhost:${HMR_PORT}`,
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
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: `http://127.0.0.1:${SERVER_PORT}/dist/`,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),

    // build handlebars templates
    new HtmlWebpackPlugin({
      hash: false,
      template: './templates/index.handlebars',
      inject: false,
      filename: 'index.handlebars',
    }),
    new HtmlWebpackPlugin({
      hash: false,
      template: './templates/error.handlebars',
      inject: false,
      filename: 'error.handlebars',
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'app'),
        exclude: 'node_modules',
        query: {
          babelrc: false,
          presets: [
            'es2015',
            'stage-0',
            'react',
            'react-hmre',
          ],
          plugins: [
            [
              'transform-class-properties',
              'transform-runtime',
              'react-transform',
              {
                transforms: [
                  {
                    transform: 'react-transform-hmr',
                    imports: [
                      'react',
                    ],
                    locals: [
                      'module',
                    ],
                  },
                ],
              },
            ],
          ],
        },
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?sourceMap!sass-loader?sourceMap&sourceComments',
      },
      {
        test: /\.jpg$/,
        loader: 'file-loader?name=[name].[ext]',
      },
    ],
  },
};
