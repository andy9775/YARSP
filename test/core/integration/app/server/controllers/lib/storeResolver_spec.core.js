/* eslint import/no-extraneous-dependencies: 0*/
/* eslint no-undef: 0*/ // disable for describe, it, etc.
/* eslint no-unused-expressions: 0*/
import { expect } from 'chai';
import mute from 'test/mute';
// eslint-disable-next-line max-len
import { storeResolver } from 'controllers/lib/storeResolver';

describe('Test storeResolver helper function for default actions', () => {
  it('Should resolve an undefined store based on POST request', () => {
    // setup data
    const routeReducerMapping = {
      '/users': {
        handler: () => Promise.resolve({ }),
        buildInitialState: data => ({ users: data }),
      },
    };
    const buildRootReducer = initial => (state = [], action) => state;
    const request = {
      method: 'POST',
      path: '/',
    };

    // invoke
    const unmute = mute();
    return storeResolver(request, routeReducerMapping, buildRootReducer)
      .then((resp) => {
        // assert
        expect(Object.keys(resp)).to.deep.equal([
          'dispatch',
          'subscribe',
          'getState',
          'replaceReducer',
        ]); // should be a redux store ...
        expect(resp.getState()).to.deep.equal([]); // ... with no state
      })
      .then(unmute);
  });

  it('Should resolve a redux store for an invalid GET request', () => {
    // setup data
    const routeReducerMapping = {
      '/users': {
        handler: () => Promise.resolve([1, 2]),
        buildInitialState: data => ({ users: data }),
      },
    };
    const buildRootReducer = initial => (state = initial, action) => state;
    const request = {
      method: 'GET',
      path: '/badRoute',
    };

    // indoke
    const unmute = mute();
    return storeResolver(request, routeReducerMapping, buildRootReducer)
      .then((resp) => {
        // assert
        expect(Object.keys(resp)).to.deep.equal([
          'dispatch',
          'subscribe',
          'getState',
          'replaceReducer',
        ]); // should be a redux store
      })
      .then(unmute);
  });

  it('Should resolve an empty redux store for an invalid request', () => {
    // setup data
    const routeReducerMapping = {
      '/users': {
        handler: () => Promise.resolve([1, 2]),
        buildInitialState: data => ({ users: data }),
      },
    };
    const buildRootReducer = initial => (state = initial, action) => state;
    const request = {
      method: 'GET',
      path: '/badRoute',
    };

    // invoke
    const unmute = mute();
    return storeResolver(request, routeReducerMapping, buildRootReducer)
      .then((resp) => {
        // assert
        expect(resp.getState()).to.deep.equal({ }); // empty state
      })
      .then(unmute);
  });

  it('Should resolve a configured redux store for a valid request', () => {
    // setup data
    const usersArray = ['user_one', 'user_two', 'user_three'];
    const expected = { users: usersArray, };
    const routeReducerMapping = {
      '/users': {
        handler: () => Promise.resolve(usersArray),
        buildInitialState: data => ({ users: data }),
      },
    };
    const buildRootReducer = initial => ((state = initial, action) => state);
    const request = {
      method: 'GET',
      path: '/users',
    };
    // invoke
    return storeResolver(request, routeReducerMapping, buildRootReducer)
      .then((resp) => {
        // assert
        expect(resp.getState()).to.deep.equal(expected);
      });
  });
});
