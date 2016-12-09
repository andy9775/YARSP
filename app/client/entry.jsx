/**
 * Main client side entry file
 */
import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { match, browserHistory } from 'react-router';
import { hydrateStore, createRoutes } from 'shared';
import buildRootReducer from 'client/buildRootReducer';
import App from 'client/App';
/* eslint no-unused-vars: 0*/
import style from 'client/styles.scss';


const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

const store = hydrateStore(buildRootReducer, window.__REDUX_STATE__ || { });
const rootNode = document.getElementById('app');

match({
  routes: createRoutes(store),
  location,
  history: browserHistory,
}, (routeError, redirectLocation, renderProps) => {
  ReactDOM.unmountComponentAtNode(rootNode);
  render(
    <App renderProps={renderProps}
         store={store} />,
    rootNode);
});

if (module.hot) {
  /*
    Workaround to persist state when app fully reloads mainly
    due to HMR reloading pure components.
    TODO: Switch to React Hot Loader 3 once out of beta and remove
    the dispose handler.
   */
  module.hot.addDisposeHandler((data) => {
    /*
      Persist state to window object, next full reload will
      fetch the current state of the app - not initial server
      provided state
     */
    window.__REDUX_STATE__ = store.getState();
    return { store: store.getState() };
  });

  module.hot.accept('../shared/store', () => {
    store.replaceReducer(hydrateStore(store.getState()));
  });

  module.hot.accept((error) => {
    // eslint-disable-next-line
    const RedBox = require('redbox-react');
    console.error(error);
    render(<RedBox error={error} />, rootNode);
  });
}
