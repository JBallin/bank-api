const request = require('supertest');
const { assert } = require('chai');
const knex = require('../queries/db');
const app = require('../app');

describe('/accounts', () => {
  before(() => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run()));

  it('GET: status=200 type=json body=(Array of Objects)', (done) => {
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
});
