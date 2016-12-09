import Root from 'test/core/mocks/components/Root';

if (typeof require.ensure !== 'function') {
  require.ensure = function ensure(array, callback) {
    callback(require);
  };
}

/* eslint global-require: 0 */
export default {
  component: Root,
  childRoutes: [
    {
      path: '/',
      getIndexRoute(partialNextState, callback) {
        callback(null, {
          component: require('test/core/mocks/components/Home').default,
        });
      },
    },
    {
      path: '/helloworld',
      getComponent(location, callback) {
        require.ensure([],
          require => callback(null,
            require('test/core/mocks/components/HelloWorld').default),
          'helloworld');
      },
    },
    {
      path: '/error',
      getComponent(location, callback) {
        throw new Error(); // simulate a route error
      },
    },
  ],
};
