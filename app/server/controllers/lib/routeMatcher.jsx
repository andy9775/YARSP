import React from 'react';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import Promise from 'bluebird';
import ReactDOMServer from 'react-dom/server';

const ERROR_TYPES = {
  ROUTER_ERROR: {
    code: 0,
    message: 'ROUTE_ERROR',
  },
  NO_RENDER_PROPS: {
    code: 1,
    message: 'NO_RENDER_PROPS',
  },
};

/**
 * A helper function for react-router which matches routes and returns a
 * rendered component
 *
 * @method routeMatcher
 * @param  {object}     routes - List of possible routes
 * @param  {string}   location - URL of the requested route (path)
 * @param  {object}     store  - Store data to add to the rendered HTML
 * @return {Promise}
 */
function routeMatcher(routes, location, store) {
  return new Promise((resolve, reject) => {
    match({
      routes,
      location,
    },
      (routeError, redirectLocation, renderProps) => {
        if (routeError) {
          reject({
            type: ERROR_TYPES.ROUTER_ERROR,
            error: routeError,
          });
        } else if (redirectLocation) {
          resolve({ redirect: redirectLocation });
        } else if (renderProps) {
          let renderedComponent;
          if (store) {
            renderedComponent = ReactDOMServer.renderToString(
              <Provider store={store}>
                <RouterContext {...renderProps} />
              </Provider>
            );
          } else {
            renderedComponent = ReactDOMServer.renderToString(
              <RouterContext {...renderProps} />
            );
          }
          resolve({
            html: renderedComponent,
            store: store ? JSON.stringify(store.getState()) : undefined,
          });
        } else {
          reject({ type: ERROR_TYPES.NO_RENDER_PROPS });
        }
      });
  });
}

export { ERROR_TYPES, routeMatcher };
