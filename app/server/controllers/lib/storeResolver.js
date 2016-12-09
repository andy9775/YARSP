import Promise from 'bluebird';
import { hydrateStore } from 'shared';
import storeWrapper from 'controllers/lib/storeWrapper';

/**
 * Build the requested redux store
 *
 * Method resolves the request path to the appropriate store name and calls
 * store hydration function.
 * @method buildStore
 * @param  {function}       buildRootReducer - request path e.g. '/users'
 * @return {function}                        - a function which accepts
 *                                             processed data as its only
 *                                             argument and builds the
 *                                             appropriate store based on the
 *                                             request path
 */
function buildStore(buildRootReducer) {
  /**
   * Use the data to build our required store.
   *
   * initialState argument should be in the format:
   *      { reducerName: <reducer_data> }
   *
   * @method
   * @param  {object}     initialState - resolved data to build the redux store
   * @return {ReduxStore}              - a build redux store
   */
  return initialState => hydrateStore(buildRootReducer, initialState);
}

/**
 * Determine which method to use to build a redux store. Resolution is based on
 * the request path.
 *
 * The data is fetched and handled and a redux store is returned
 *
 * @method storeResolver
 * @param {object}                    req - express request object
 * @param {object}    routeReducerMapping - Object mapping a route path to a
 *                                          handler and buildInitialState
 *                                          method. The handler is  responsible
 *                                          for returning the requested data.
 *                                          The buildInitialState method is
 *                                          responsible for returning a
 *                                          {'reducerName': 'reducerData'}
 *                                          object.
 * @return {Promise}                      - continued promise chain to resolve
 *                                          the data store
 */
export function storeResolver(req, routeReducerMapping, buildRootReducer) {
  // ensure only get requests and valid paths are handled
  if (req.method.toUpperCase() !== 'GET' ||
    Object.keys(routeReducerMapping).indexOf(req.path) === -1) {
    const method = req.method.toUpperCase() !== 'GET' ? 'error' : 'info';
    // eslint-disable-next-line no-console
    console[method](
      'Attempting to resolve data for an undefined store path or HTTP method: ',
      req.method, req.path);
    return storeWrapper(() => Promise.resolve({ }))
      .then(buildStore(buildRootReducer));
  }

  /*
    Resolve the requested URL path to a specified store. E.g. '/users' could
    return the users redux store by resolving the correct reducer.
   */
  if (routeReducerMapping && Object.keys(routeReducerMapping).length > 0) {
    return storeWrapper(routeReducerMapping[req.path].handler, req)
      .then(routeReducerMapping[req.path].buildInitialState)
      .then(buildStore(buildRootReducer));
  }

  return storeWrapper(() => Promise.resolve({ }))
    .then(buildStore(buildRootReducer));
}
