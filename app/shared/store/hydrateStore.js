import { createStore } from 'redux';

/**
 * Create a new redux store with the supplied app state.
 * @method hydrateStore
 * @param {function}    buildRootReducer - function used to build the root
 *                                         reducer with the provided initial
 *                                         state
 * @param  {object}     initialState     - starting app state fetched server or
 *                                         client side
 * @return {ReduxState}
 */
export default function hydrateStore(buildRootReducer, initialState) {
  return createStore(buildRootReducer(initialState));
}
