/* eslint import/no-extraneous-dependencies: 0 */
/* eslint no-undef: 0 */
/* eslint new-cap: 0*/
import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import mockery from 'mockery';
import { buildImmutableMock } from 'test/application/mocks';

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

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.set({ env: 'production' });

describe('Test v1 API routing', () => {
  // ================================= setup ===================================
  before(() => {
    mockery.enable({
      warnOnUnregistered: false,
      useCleanCache: true,
    });
    mockery.registerMock('immutable', ImmutableMock);

    // eslint-disable-next-line global-require
    const v1 = require(
      'controllers/routes/api/v1'
    ).default;

    app.use('/api/v1', v1);
  });

  after(() => {
    mockery.deregisterAll();
    mockery.disable();
  });

  beforeEach(() => {
    // reset the data fixture
    ImmutableMock.mock.reset();
  });

  // ================================= tests ===================================
  it('Should GET todos', (done) => {
    // invoke
    request(app)
      .get('/api/v1/todos')
      // assert
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        const expected = {
          data: mockData,
          status: 200,
        };
        expect(res.body).to.deep.equal(expected);
        done(err);
      });
  });

  it('Should POST a todo to the endpoint', (done) => {
    // invoke
    request(app)
      .post('/api/v1/todos')
      .send({ // should ignore certain data passed
        content: 'two',
        id: 0,
        done: true,
      })
      // assert
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.deep.equal({
          data: mockData.concat({
            id: 2,
            content: 'two',
            done: false,
          }),
          status: 200,
        });
        done(err);
      });
  });

  it('Should PUT a new todo to the endpoint', (done) => {
    // invoke
    request(app)
      .put('/api/v1/todos')
      .send({ // should insert new since id: 2 does not exist in the store
        content: 'two',
        id: 2,
        done: false,
      })
      // assert
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.deep.equal({
          data: mockData.concat({
            id: 2,
            content: 'two',
            done: false,
          }),
          status: 200,
        });
        done(err);
      });
  });

  it('Should modify an existing todo at the end point on PUT', (done) => {
    // invoke
    request(app)
      .put('/api/v1/todos')
      .send({
        content: 'one', // should ignore...
        id: 0, // and fetch based on id
        done: true, // and ignore state
      })
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
            {
              id: 1,
              content: 'one',
              done: false,
            },
          ],
          status: 200,
        });
        done(err);
      });
  });

  it('Should DELETE an existing store item', (done) => {
    // invoke
    request(app)
      .delete('/api/v1/todos')
      .send({
        id: 0,
        content: 'zero',
        done: false,
      })
      // assert
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.deep.equal({
          data: [
            {
              id: 1,
              content: 'one',
              done: false,
            },
          ],
          status: 200,
        });
        done(err);
      });
  });

  it('Should not modify the store on DELETE request for invalid item',
    (done) => {
      // invoke
      request(app)
        .delete('/api/v1/todos')
        .send({
          id: 2,
          content: 'two',
          done: false,
        })
        // assert
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.deep.equal({
            data: mockData,
            status: 200,
          });
          done(err);
        });
    });
});
