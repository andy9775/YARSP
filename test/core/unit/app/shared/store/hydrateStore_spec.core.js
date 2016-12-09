/* eslint import/no-extraneous-dependencies: 0*/
/* eslint no-unused-expressions: 0*/
/* eslint no-undef: 0*/ // disable for describe, it, etc.
import { expect } from 'chai';
import sinon from 'sinon';
import { buildRootReducer } from 'test/core/mocks';
import hydrateStore from 'shared/store/hydrateStore';

describe('Test store hydration function', () => {
  it('Should call buildRootReducer function with provided initial state',
    (done) => {
      // setup data
      const expectedData = { helloReducer: [1, 2, 3] };
      const buildRootReducerSpy = sinon.spy(buildRootReducer);

      // invoke
      hydrateStore(buildRootReducerSpy, expectedData);

      // assert
      expect(buildRootReducerSpy.calledWith(expectedData)).to.be.true;
      done();
    });

  it('Should return a redux state object', (done) => {
    // setup data
    const expectedData = { helloReducer: [1, 2, 3] };

    // invoke
    const result = hydrateStore(buildRootReducer, expectedData);

    // assert
    expect(result).to.have.all.keys([
      'dispatch',
      'subscribe',
      'getState',
      'replaceReducer',
    ]);
    done();
  });

  it('Should return a redux state object with the specified state', (done) => {
    // setup data
    const expectedData = { helloReducer: [1, 2, 3] };

    // invoke
    const result = hydrateStore(buildRootReducer, expectedData);

    // assert
    expect(result.getState()).to.deep.equal(expectedData);
    done();
  });

  it('Should return empty state based on invalid initial state', (done) => {
    // setup data
    const expectedData = { helloReducer: [] };

    // invoke
    const result = hydrateStore(buildRootReducer, {
      helloStore: [
        1,
        2,
        3,
      ],
    });

    // assert
    expect(result.getState()).to.deep.equal(expectedData);
    done();
    });
});
