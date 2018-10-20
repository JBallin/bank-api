const request = require('supertest');
const { assert, expect } = require('chai');
const knex = require('../db/queries/db');
const app = require('../app');

/* eslint-disable camelcase */
const name = 'Michael Jordan';
const bank_name = 'Bank of America';
const description = 'Savings';
const transactions = [];
const properPayload = {
  name, bank_name, description, transactions,
};
const payloadMissingTransactions = { name, bank_name, description };
const seed1 = {
  id: 1, name: 'John Doe', bank_name: 'Bank of America', description: 'Main', transactions: [],
};
const payloadNewName = { ...properPayload, name: 'MJ' };
/* eslint-enable camelcase */

const assertMatch = (payload, resBody) => {
  Object.keys(payload).forEach((prop) => {
    expect(resBody).to.have.deep.property(prop, payload[prop]); // eslint-disable-line
  });
};

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
        assertMatch(seed1, res.body[0]);
        done();
      });
  });

  describe('POST', () => {
    it('{} (400)', (done) => {
      request(app)
        .post('/accounts')
        .expect(400)
        .end((err, res) => {
          if (err) done(err);
          assert.equal(res.text, 'Invalid input');
          done();
        });
    });

    it('{payload} (201)', (done) => {
      request(app)
        .post('/accounts')
        .send(properPayload)
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) done(err);
          assert.lengthOf(res.body, 1);
          assertMatch(properPayload, res.body[0]);
          done();
        });
    });

    it('{payload w/o trxns} (201)', (done) => {
      request(app)
        .post('/accounts')
        .send(payloadMissingTransactions)
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) done(err);
          assert.lengthOf(res.body, 1);
          assertMatch(properPayload, res.body[0]);
          done();
        });
    });
  });

  describe('PUT', () => {
    it('should update name', (done) => {
      request(app)
        .put('/accounts')
        .send(payloadNewName)
        .expect(204)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) done(err);
          assert.lengthOf(res.body, 1);
          assertMatch(payloadNewName, res.body[0]);
          done();
        });
    });
  });
});
