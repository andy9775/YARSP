/* eslint import/no-extraneous-dependencies: 0*/
/* eslint no-undef: 0*/ // disable for describe, it, etc.
/* eslint no-unused-expressions: 0*/
import { expect } from 'chai';
import request from 'supertest';
import fs from 'fs';
import path from 'path';
import mockery from 'mockery';
import mute from 'test/mute';
import { buildImmutableMock } from 'test/application/mocks';

const expectedData = [
  {
    id: 0,
    content: 'zero',
    done: false,
  },
  {
    id: 1,
    content: 'one',
    done: false,
  },
];
const ImmutableMock = buildImmutableMock(expectedData);

describe('Test todo app requests', () => {
  // ================================= HTML ====================================
  describe('Test HTML rendering', () => {
    let app;
    before(() => {
      mockery.enable({
        warnOnUnregistered: false,
        useCleanCache: true,
      });
      mockery.registerMock('immutable', ImmutableMock);

      // eslint-disable-next-line global-require
      app = require('app/server').app;
      app.set('views', 'templates'); // reset the templates directory
    });

    after(() => {
      mockery.deregisterAll();
      mockery.disable();
    });

    beforeEach(() => {
      ImmutableMock.mock.reset();
    });
    it('Should return the home page for a GET request to /', (done) => {
      // setup data
      const expectedHomePage = fs.readFileSync(
        path.resolve(path.join(__dirname, './expectedHomePage.txt')), 'UTF-8');

      // invoke
      const unmute = mute();
      request(app)
        .get('/')
        // assert
        .expect(200)
        .end((err, res) => {
          expect(res.text).to.contain(expectedHomePage);
          unmute();
          done(err);
        });
    });

    it('Should return the about page for a GET request to /about', (done) => {
      // setup data
      const expectedAboutPage = fs.readFileSync(
        path.resolve(path.join(__dirname, './expectedAboutPage.txt')), 'UTF-8');

      // invoke
      const unmute = mute();
      request(app)
        .get('/about')
        // assert
        .expect(200)
        .end((err, res) => {
          expect(res.text).to.contain(expectedAboutPage);
          unmute();
          done(err);
        });
    });

    it('Should return the todo page for a GET request to /todos', (done) => {
      // setup data
      const expectedTodoPage = fs.readFileSync(
        path.resolve(path.join(__dirname, './expectedTodoPage.txt')), 'UTF-8');

      // invoke
      const unmute = mute();
      request(app)
        .get('/todos')
        // assert
        .expect(200)
        .end((err, res) => {
          unmute();
          expect(res.text).to.contain(expectedTodoPage);
          done(err);
        });
    });
  });

  // ================================== API ====================================
  describe('Test Api fetching', () => {
    let app;
    before(() => {
      mockery.enable({
        warnOnUnregistered: false,
        useCleanCache: true,
      });
      mockery.registerMock('immutable', ImmutableMock);

      // eslint-disable-next-line global-require
      app = require('app/server').app;
      app.set('views', 'templates'); // reset the templates directory
    });

    after(() => {
      mockery.deregisterAll();
      mockery.disable();
    });

    beforeEach(() => {
      ImmutableMock.mock.reset();
    });
    it('Should return the todos with a GET call to /api/v1/todos',
      (done) => {
        // invoke
        request(app)
          .get('/api/v1/todos')
          // assert
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.deep.equal({
              data: expectedData,
              status: 200,
            });
            done(err);
          });
      });

    it('Should insert and return todos with a POST call to /api/v1/todos',
      (done) => {
        // invoke
        request(app)
          .post('/api/v1/todos')
          .send({ content: 'two' })
          // assert
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.deep.equal({
              data: expectedData.concat({
                content: 'two',
                id: 2,
                done: false,
              }),
              status: 200,
            });
            done(err);
          });
      });

    it('Should insert and return todos with a PUT call to /api/v1/todos',
      (done) => {
        // invoke
        request(app)
          .put('/api/v1/todos')
          .send({ content: 'two', })
          // assert
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.deep.equal({
              data: expectedData.concat({
                content: 'two',
                id: 2,
                done: false,
              }),
              status: 200,
            });
            done(err);
          });
      });

    it('Should modify and return todos with a PUT call to /api/v1/todos',
      (done) => {
        // invoke
        request(app)
          .put('/api/v1/todos')
          .send({ id: 0, })
          // assert
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.deep.equal({
              data: [
                {
                  id: 0,
                  content: 'zero',
                  done: true,
                },
                expectedData[1],
              ],
              status: 200,
            });
            done(err);
          });
      });

    it('Should delete and return todos with a DELETE call to /api/v1/todos',
      (done) => {
        // invoke
        request(app)
          .delete('/api/v1/todos')
          .send({ id: 0, })
          // assert
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.deep.equal({
              data: [
                expectedData[1],
              ],
              status: 200,
            });
            done(err);
          });
      });
  });
});
