/* eslint import/no-extraneous-dependencies: 0*/
/* eslint no-undef: 0*/ // disable for describe, it, etc.
/* eslint no-unused-expressions: 0*/
import { expect } from 'chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import mute from 'test/mute';
import renderPage from 'controllers/frontEnd';
import { routes, routeReducerMapping, buildRootReducer } from 'test/core/mocks';

// pre-configure the renderPage function with mocked config data
const rp = renderPage(routes, routeReducerMapping, buildRootReducer);

describe('Test front end page rendering based on pre-configured routes',
  () => {
    it('Should render the index template with a valid path', () => {
      // setup data
      const req = mockReq({
        path: '/',
        method: 'GET',
      });
      const res = mockRes();

      // invoke
      const unmute = mute();
      return rp(req, res)
        .then((val) => {
          // assert
          expect(res.render.calledWith('index', {
            body: '<div data-reactroot="" data-reactid="1" data-react-' +
              'checksum="386342191"><div data-reactid="2">Welcome home!' +
              '</div></div>',
            initialState: '{"helloReducer":[]}',
          })).to.be.true;
        })
        .then(unmute);
    });

    it('Should render the index template with store data', () => {
      // setup data
      const req = mockReq({
        path: '/helloworld',
        method: 'GET',
      });

      // invoke
      const res = mockRes();
      return rp(req, res)
        .then((val) => {
          // assert
          expect(res.render.calledWith('index', {
            body: '<div data-reactroot="" data-reactid="1" data-react-' +
              'checksum="-519234347"><div data-reactid="2">hello world</div>' +
              '</div>',
            initialState: '{"helloReducer":[1,2]}',
          })).to.be.true;
        });
    });

    it('Should respond with a 404 error code when requesting an invalid path',
      () => {
        // setup data
        const req = mockReq({
          path: '/badpath',
          method: 'GET',
        });
        const res = mockRes();

        // invoke
        const unmute = mute();
        return rp(req, res)
          .then((val) => {
            // assert
            expect(res.render.calledWith('error', {
              code: 404,
              message: 'Path not found',
            })).to.be.true;
          })
          .then(unmute);
      });

    it('Should respond with a 500 error code when a route path throws an error',
      () => {
        // setup data
        const req = mockReq({
          path: '/error',
          method: 'GET',
        });
        const res = mockRes();

        // invoke
        const unmute = mute();
        return rp(req, res)
          .then((val) => {
            // assert
            expect(res.render.calledWith('error', {
              code: 500,
              message: 'Server error',
            })).to.be.true;
          })
          .then(unmute);
      });
  });
