/**
 * Wrapper around mute library allowing global muting in tests dependent on the
 * value of process.env.SILENCE_CONSOLE ('true' or 'false')
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import mute from 'mute';

if (process.env.SILENCE_CONSOLE === 'true') {
  module.exports = mute;
} else {
  module.exports = () => () => -1;
}
