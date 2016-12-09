import { routeMatcher } from 'controllers/lib/routeMatcher';

/**
 * A helper function for matching react-router routes with the specified route
 * and resolving app state
 *
 * @method render
 * @param  {object}           routes - react-router routes configuration
 * @param  {string}         location - URL path of the request e.g. '/about'
 * @param  {Promise}    storePromise - Function which returns a promise
 *                                     resolving the application state
 * @return {Promise}            Promise which returns the resolved component
 */
export function render(routes, location, storePromise) {
  if (!routes || !location) {
    throw new Error('Routes and Location must not be undefined');
  }

  if (storePromise) {
    return storePromise // get data from the store
      .then(store => routeMatcher(routes, location, store));
  }
  return routeMatcher(routes, location);
}
