const request = require('supertest');
const { assert } = require('chai');
const knex = require('../db/queries/db');
const app = require('../app');

describe('/accounts', () => {
  before(() => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run()));

  it('GET (200)', (done) => {
    request(app)
      .get('/accounts')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) done(err);
        assert.isArray(res.body);
        assert.isObject(res.body[0]);
        done();
      });
  });

  it('POST {} (400)', (done) => {
    request(app)
      .post('/accounts')
      .expect(400)
      .end((err, res) => {
        assert.equal(res.text, 'Invalid input');
        done();
      });
  });
});
