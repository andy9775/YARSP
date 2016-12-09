/**
 * Development environment server configuration
 */

import express from 'express';
/* eslint import/no-extraneous-dependencies: 0 */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import WebpackDevServer from 'webpack-dev-server';

import expressHandlebars, { NetworkView } from 'express-handlebars';

import chalk from 'chalk';

import favicon from 'serve-favicon';

import config from 'root/webpack.config.dev';

const app = new express();
const compiler = webpack(config);
const devMiddleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
});
const hotMiddleware = webpackHotMiddleware(compiler);

app.use(devMiddleware);
app.use(hotMiddleware);

app.use(favicon('public/favicon.ico'));

// setup handlebars middleware
app.engine('handlebars', expressHandlebars({
  /*
  For HMR to work we must use the default handlebars template,
  not webpack generated template
  */
  extname: '.handlebars',
  layoutsAddress: config.output.publicPath,
}));

app.set('view engine', 'handlebars');
/*
For HMR to work we must use the default handlebars template,
not webpack generated template
*/
app.set('views', config.output.publicPath);

// set a custom view resolver
app.set('view', NetworkView);

const statOptions = {
  colors: true,
  hash: false,
  timings: false,
  chunks: false,
  chunkModules: false,
  modules: false,
  children: true,
  version: true,
  cached: false,
  cachedAssets: false,
  reasons: false,
  source: false,
  errorDetails: false,
};

const HMR_PORT = process.env.HMR_PORT || 3001;
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: statOptions,
})
  .listen(HMR_PORT, 'localhost', (err, result) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      console.info(`react ${chalk.blue('hot module reload')} server ` +
        `started on: ${chalk.blue('localhost:')}${chalk.blue(HMR_PORT)}`);
    }
  });

export default app;
