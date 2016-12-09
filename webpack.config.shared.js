/* eslint-disable */
var path = require('path');

module.exports = {
  resolve: {
    alias: {
      root: __dirname,

      app: path.join(__dirname, 'app'),

      client: path.join(__dirname, 'app/client'),

      controllers: path.join(__dirname, 'app/server/controllers'),

      shared: path.join(__dirname, 'app/shared'),
      store: path.join(__dirname, 'app/shared/store'),

      test: path.join(__dirname, 'test'),
    },
    extensions: [
      '.js',
      '.jsx',
      '.scss',
    ],
    modules: [
      path.resolve('./app'),
      path.resolve('node_modules/'),
    ],
  },
};
