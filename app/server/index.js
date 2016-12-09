/* eslint no-console: 0 */
/**
 * Main server configuration shared between
 * production and development environments
 */
import express from 'express';

import path from 'path';
import chalk from 'chalk';

// third party express middleware
import bodyParser from 'body-parser';
import morgan from 'morgan';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';

import { buildRoutes } from 'app/server/routeBuilder';

// eslint-disable-next-line import/no-mutable-exports
let app;
const PORT = process.env.SERVER_PORT || 3000;
const DEVELOPMENT = process.env.NODE_ENV === 'development';

/* eslint global-require: 0 */
if (DEVELOPMENT) {
  app = require('app/server/development').default;
} else {
  app = require('app/server/production').default;
}
app.set({ env: DEVELOPMENT ? 'development' : 'production' });
app.locals.IS_DEV = DEVELOPMENT; // identify current run mode

// add support for all HTTP methods for browsers that don't support them
app.use(methodOverride('X-HTTP-Method-Override'));

// setup middleware shared between development and production environments
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));
if (process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
}
app.use(cookieParser());

// serve js bundles
app.use(express.static(path.join(__dirname, '../../public')));

// add routes to the app
buildRoutes(app);

/**
 * Start the server
 * @method start
 */
function start() {
  app.listen(PORT, (err) => {
    if (err) {
      console.error(`${chalk.red.bold('ERROR')} starting the app`);
      console.error(err.stack);
      process.exit(1);
    }

    console.info(
      `${chalk.green.bold(process.env.NODE_ENV.toUpperCase())} server ` +
      `started on port: ${chalk.green.bold(PORT)}`
    );
  });
}

export { app, start };
