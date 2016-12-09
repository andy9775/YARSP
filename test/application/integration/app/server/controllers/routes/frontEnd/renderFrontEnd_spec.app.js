/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-undef: 0 */
/* eslint new-cap: 0*/
import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import mockery from 'mockery';
import expressHandlebars from 'express-handlebars';
import bodyParser from 'body-parser';
import path from 'path';
import fs from 'fs';
import mute from 'test/mute';
import { buildImmutableMock } from 'test/application/mocks';

// setup test wide mocks
const mockData = [
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
const ImmutableMock = buildImmutableMock(mockData);

// setup app
const templatePath = path.resolve(
  path.join(__dirname, '../../../../../../../../templates/')
);

const app = express();
app.engine('handlebars', expressHandlebars({
  layoutDir: templatePath,
  extname: 'handlebars',
}));
app.set('view engine', 'handlebars');
app.set('views', templatePath);
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.set({ env: 'production' });

describe('Test front end page rendering for defined front end routes',
  () => {
    // ============================== setup ====================================
    before(() => {
      mockery.enable({
        warnOnUnregistered: false,
        useCleanCache: true,
      });
      mockery.registerMock('immutable', ImmutableMock);

      // eslint-disable-next-line global-require
      const frontEnd = require('controllers/routes/frontEnd').frontEnd;

      app.use('/', frontEnd);
    });

    after(() => {
      mockery.deregisterAll();
      mockery.disable();
    });

    beforeEach(() => {
      ImmutableMock.mock.reset();
    });

    // ============================== tests ====================================
    it('Should render the home page for a request to /', (done) => {
      // setup data
      const expectedHomePage = fs.readFileSync(
        path.join(__dirname, './expectedHomeHtml.txt'), 'UTF-8');

      // invoke
      const unmute = mute();
      request(app)
        .get('/')
        // assert
        .expect(200)
        .expect('Content-Type', /html/)
        .end((err, res) => {
          unmute();
          expect(res.text).to.contain(expectedHomePage);
          done(err);
        });
    });

    it('Should render the about page for a request to /about', (done) => {
      // setup data
      const expectedAboutPage = fs.readFileSync(
        path.join(__dirname, './expectedAboutHtml.txt'), 'UTF-8');

      // invoke
      const unmute = mute();
      request(app)
        .get('/about')
        // assert
        .expect(200)
        .expect('Content-Type', /html/)
        .end((err, res) => {
          unmute();
          expect(res.text).to.contain(expectedAboutPage);
          done(err);
        });
    });

    it('Should render the todos page for a request to /todos', (done) => {
      // setup data
      const expectedTodosPage = fs.readFileSync(
        path.join(__dirname, './expectedTodoHtml.txt'), 'UTF-8');

      // invoke
      const unmute = mute();
      request(app)
        .get('/todos')
        // assert
        .expect(200)
        .expect('Content-Type', /html/)
        .end((err, res) => {
          unmute();
          expect(res.text).to.contain(expectedTodosPage);
          done(err);
        });
    });
  });
