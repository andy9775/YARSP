/**
 * Main start script
 *
 * Determines if the app is running in
 * production or development mode and runs
 * the appropriate server
 */

// ignore eslint errors in boot file
/* eslint global-require: 0 */
/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-console: 0 */
/* eslint comma-dangle: 0 */
/* eslint import/no-unresolved: 0 */
if (process.env.NODE_ENV === 'development') {
  require('babel-core/register')();
  require('babel-polyfill');
  require('./app/server').start();
} else if (process.env.NODE_ENV === 'production' ||
  process.env.NODE_ENV === 'test') {
  require('./build/server').start();
} else {
  const expectedColor = require('chalk').green.bold;
  const actualColor = require('chalk').red.bold;

  console.error(
    `Expected NODE_ENV to be \
    ${expectedColor('production')} or \
    ${expectedColor('development')}. Got \
    ${actualColor(process.env.NODE_ENV)}`
  );
  process.exit(1);
}
