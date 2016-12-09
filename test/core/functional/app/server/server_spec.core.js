/* eslint import/no-extraneous-dependencies: 0*/
/* eslint no-undef: 0*/ // disable for describe, it, etc.
/* eslint no-unused-expressions: 0*/
import { expect } from 'chai';
import request from 'supertest';
import path from 'path';
import fs from 'fs';
import mockery from 'mockery';
import mute from 'test/mute';

describe('Test production server configuration', () => {
  // ================================ setup ==================================

  let app;

  before(() => {
    mockery.enable({
      warnOnUnregistered: false,
      useCleanCache: true,
    });
    /*
      mock replacement must be relative to root app directory in this case
      being the 'app' directory
     */
    mockery.registerSubstitute('../server/routeBuilder',
      path.resolve(path.join(__dirname, '../../../mocks/routeBuilder'))
    );

    // eslint-disable-next-line global-require
    app = require('app/server').app;
    app.set('views', 'templates'); // reset the templates directory
  });

  after(() => {
    mockery.deregisterAll();
    mockery.disable();
  });

  // ================================ test ===================================
  it('Should contain specified headers for a request to the api',
    (done) => {
      // invoke
      request(app)
        .get('/api/v1/todos')
        // assert
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(Object.keys(res.headers)).to.not.contain('x-powered-by');

          expect(res.headers['x-dns-prefetch-control'])
            .to.deep.equal('off');
          expect(res.headers['x-frame-options'])
            .to.deep.equal('SAMEORIGIN');
          expect(res.headers['x-download-options'])
            .to.deep.equal('noopen');
          expect(res.headers['x-content-type-options'])
            .to.deep.equal('nosniff');
          expect(res.headers['x-xss-protection'])
            .to.deep.equal('1; mode=block');

          done(err);
        });
    });

  it('Should return a specified result for a call to the api',
    (done) => {
      // setup data
      const expectedData = {
        data: [
          {
            id: 0,
            content: 'two',
            done: false,
          },
          {
            id: 1,
            content: 'one',
            done: false,
          },
        ],
        status: 200,
      };

      // invoke
      request(app)
        .get('/api/v1/todos')
        // assert
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.deep.equal(expectedData);
          done(err);
        });
    });

  it('Should contain specified headers for a call to the frontend',
    (done) => {
      // invoke
      const unmute = mute();
      request(app)
        .get('/')
        // assert
        .expect(200)
        .end((err, res) => {
          expect(Object.keys(res.headers)).to.not.contain('x-powered-by');

          expect(res.headers['x-dns-prefetch-control'])
            .to.deep.equal('off');
          expect(res.headers['x-frame-options'])
            .to.deep.equal('SAMEORIGIN');
          expect(res.headers['x-download-options'])
            .to.deep.equal('noopen');
          expect(res.headers['x-content-type-options'])
            .to.deep.equal('nosniff');
          expect(res.headers['x-xss-protection'])
            .to.deep.equal('1; mode=block');
          unmute();
          done(err);
        });
    });

  it('Should contain the front end HTML for a request to /',
    (done) => {
      // setup data
      const expectedFrontEndHtml = fs.readFileSync(
        path.join(__dirname, './expectedHomePage.txt'), 'UTF-8');
      const unmute = mute();
      // invoke
      request(app)
        .get('/')
        // assert
        .expect(200)
        .end((err, res) => {
          expect(res.text).to.contain(expectedFrontEndHtml);
          unmute();
          done(err);
        });
    });
});
