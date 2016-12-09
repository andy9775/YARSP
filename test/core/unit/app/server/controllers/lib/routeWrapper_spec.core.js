/* eslint import/no-extraneous-dependencies: 0*/
/* eslint no-undef: 0*/ // disable for describe, it, etc.
/* eslint no-unused-expressions: 0*/
import { expect } from 'chai';
import Promise from 'bluebird';
import { mockRes } from 'sinon-express-mock';
// eslint-disable-next-line max-len
import { routeWrapper } from 'controllers/lib/routeWrapper';


describe('Test routerWrapper helper function', () => {
  it('Should call response.json when returning data', () => {
    // setup data
    const mockResponse = mockRes();
    const apiMethod = (opt, data) => Promise.resolve({ one: 1 });

    // invoke
    routeWrapper(apiMethod)(undefined, mockResponse, undefined)
      .then(() =>
      // assert
      expect(mockResponse.json.calledOnce).to.be.true);
  });

  it('Should call response.json with specific arguments', () => {
    // setup data
    const mockResponse = mockRes();
    const expectedResponse = { one: 1 };
    const apiMethod = (opt, data) => Promise.resolve(expectedResponse);

    // invoke
    routeWrapper(apiMethod)(undefined, mockResponse, undefined)
      .then(() =>
      // assert
      expect(
        mockResponse.json.calledWith(expectedResponse)).to.be.true
    );
  });

  it('Should handle errors thrown inside router handlers', () => {
    // setup data
    const mockResponse = mockRes();
    const expectedRejection = {
      statusCode: 404,
      message: 'error finding resource',
    };
    const apiMethod = (opt, data) => Promise.reject(expectedRejection);

    // invoke
    routeWrapper(apiMethod)(undefined, mockResponse, undefined)
      .then(() => {
        // assert
        expect(
          mockResponse.json.calledWith(expectedRejection.message))
          .to.be.true;
        expect(
          mockResponse.status.calledWith(expectedRejection.statusCode))
          .to.be.true;
      });
  });
});
