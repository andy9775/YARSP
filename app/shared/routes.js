/**
 * Application wide route configuration
 */
/* eslint global-require: 0 no-unused-expressions: 0*/
import axios from 'axios';
import isNode from 'detect-node';
import Root from 'client/root';
import { todoActions } from 'client/todos/store';

// polyfill
if (typeof require.ensure !== 'function') {
  require.ensure = function ensure(array, callback) {
    callback(require);
  };
}

export function createRoutes(store) {
  return {
    component: Root,
    childRoutes: [
      {
        path: '/',
        getIndexRoute(partialNextState, callback) {
          callback(null, {
            component: require('client/home').default,
          });
        },
      },
      {
        path: '/about',
        getComponent(location, callback) {
          require.ensure([],
            require => callback(null, require('client/about').default),
            'about');
        },
      },
      {
        path: '/todos',
        getComponent(location, callback) {
          require.ensure([],
            (require) => {
              callback(null, require('client/todos').default);
              /*
                Must check if the current operation environment is node. This
                gets called by both the server (during server side rendering)
                and on the client (during route transition).
               */
              if (!isNode && !store) {
                console.error(
                  'Store should not be undefined when building routes'
                );
              }
              if (!isNode && store) {
                axios.get('/api/v1/todos')
                  .then((resp) => {
                    store.dispatch(
                      todoActions.hydrateTodoStore(resp.data.data)
                    );
                  });
              }
            },
            'todo');
        },
      },
    ],
  };
}

// export route object with no defined store
const routes = createRoutes();
export default routes;
