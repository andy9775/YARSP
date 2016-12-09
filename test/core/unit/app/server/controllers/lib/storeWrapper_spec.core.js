/* eslint import/no-extraneous-dependencies: 0*/
/* eslint no-undef: 0*/ // disable for describe, it, etc.
/* eslint no-unused-expressions: 0*/
import { expect } from 'chai';
import sinon from 'sinon';
import { mockReq } from 'sinon-express-mock';
// eslint-disable-next-line max-len
import storeWrapper from 'controllers/lib/storeWrapper';

describe('Test store wrapper helper', () => {
  it('Should call the API method with requested extracted arguments',
    (done) => {
      // setup mocks
      const requestData = {
        body: 'hello world',
        query: {
          one: 1,
        },
        params: {
          two: 2,
        },
        session: {
          key: '123',
        },
      };
      const mockRequest = mockReq(requestData);
      const apiMethodSpy = sinon.spy();

      // expected
      const expectedOptions = {
        one: 1,
        two: 2,
      };
      const expectedData = 'hello world';

      // invoke
      storeWrapper(apiMethodSpy, mockRequest);

      // assert/expect
      expect(apiMethodSpy.calledOnce).to.be.true;
      expect(apiMethodSpy.calledWith(expectedOptions, expectedData)).to.be.true;
      done();
    });
});
