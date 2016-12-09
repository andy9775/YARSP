/* eslint import/no-extraneous-dependencies: 0*/
/* eslint no-undef: 0*/ // disable for describe, it, etc.
/* eslint no-unused-expressions: 0*/
import { expect } from 'chai';
import { mockReq } from 'sinon-express-mock';
import { render, storeResolver } from 'controllers/lib';
import { routes, routeReducerMapping, buildRootReducer } from 'test/core/mocks';

describe('Test front end rendering function based on mocked routes', () => {
  it('Should throw an error for missing routes', () => {
    // invoke
    expect(() => render(undefined, '/path', undefined))
      .to.throw('Routes and Location must not be undefined');
  });

  it('Should throw an error for missing location', () => {
    // invoke
    expect(() => render(routes, undefined, undefined))
      .to.throw('Routes and Location must not be undefined');
  });

  it('Should return a valid route with no store', () => {
    // invoke
    render(routes, '/', undefined)
      .then((data) => {
        // assert
        expect(data).to.deep.equal({
          html: '<div data-reactroot="" data-reactid="1" data-react-' +
            'checksum="386342191"><div data-reactid="2">Welcome home!</div>' +
            '</div>',
          store: undefined,
        });
      });
  });

  it('Should return a valid route with a store', () => {
    // setup mocks
    const req = mockReq({
      path: '/helloworld',
      method: 'GET',
    });

    // invoke
    render(routes, '/',
      storeResolver(req, routeReducerMapping, buildRootReducer))
      .then((data) => {
        // assert
        expect(data).to.deep.equal({
          html: '<div data-reactroot="" data-reactid="1" data-react-' +
            'checksum="386342191"><div data-reactid="2">Welcome home!</div>' +
            '</div>',
          store: '{"helloReducer":[1,2]}',
        });
      });
  });
});
