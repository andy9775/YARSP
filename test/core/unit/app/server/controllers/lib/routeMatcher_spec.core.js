/* eslint import/no-extraneous-dependencies: 0*/
/* eslint no-undef: 0*/ // disable for describe, it, etc.
/* eslint no-unused-expressions: 0*/
/* eslint quotes: 0*/ // allow double quote strings in tests
import { createStore } from 'redux';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { routes } from 'test/core/mocks';
// eslint-disable-next-line max-len
import { routeMatcher, ERROR_TYPES } from 'controllers/lib/routeMatcher';

chai.use(chaiAsPromised);

/**
 * Ensure the route matcher helper function processes route requests based on
 * route specification and rejects invalid routes. Ensure the route matcher
 * returns a valid store when provided.
 */
describe('Test routeMatcher helper function', () => {
  it('Should reject with an invalid path request', () =>
  // invoke/assert
  expect(routeMatcher(routes, '/badPath'))
    .to.be.rejected.and
    .to.eventually.deep.equal({
    type: ERROR_TYPES.NO_RENDER_PROPS,
  })
  );

  it('Should resolve the correct jSX markup for a index valid path', () =>
  // invoke/assert
  expect(routeMatcher(routes, '/'))
    .to.eventually.deep.equal({
    html: "<div data-reactroot=\"\" data-reactid=\"1\" data-react-" +
      "checksum=\"386342191\"><div data-reactid=\"2\">Welcome home!</div>" +
      "</div>",
    store: undefined,
  }));

  it('Should resolve the correct jSX markup for a valid path', () =>
  // invoke/assert
  expect(routeMatcher(routes, '/helloworld'))
    .to.eventually.deep.equal({
    html: "<div data-reactroot=\"\" data-reactid=\"1\" data-react-" +
      "checksum=\"-519234347\"><div data-reactid=\"2\">hello world</div>" +
      "</div>",
    store: undefined,
  }));

  it('Should resolve the correct jSX markup with a store for a valid path',
    () => {
      // setup data
      const expected = [1, 2, 3];

      // invoke/assert
      return expect(routeMatcher(routes, '/helloworld',
        createStore((store = expected, action) => store)))
        .to.eventually.deep.equal({
        html: "<div data-reactroot=\"\" data-reactid=\"1\" data-react-" +
          "checksum=\"-519234347\"><div data-reactid=\"2\">hello world</div>" +
          "</div>",
        store: JSON.stringify(expected),
      });
    });
});
