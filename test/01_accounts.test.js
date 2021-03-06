const request = require('supertest');
const { assert } = require('chai');
const knex = require('../src/queries/db');
const app = require('../app');
const { seeds } = require('../db/seeds/00_accounts');
const transactionSeeds = require('../db/seeds/01_transactions').seeds;
const { assertMatch } = require('./utils');

const properPayload = {
  name: 'Roger Rabbit',
  bank_name: 'Maryland Bank',
  description: 'Savings',
};

const payloadNewName = { name: 'MJ' };

const firstAccountTransactions = transactionSeeds
  .filter(transaction => transaction.account_id === 1);

describe('accounts', () => {
  before(() => knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run()));

  describe('/accounts', () => {
    describe('GET', () => {
      it('(200)', (done) => {
        request(app)
          .get('/accounts')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) done(err);
            assertMatch(res.body[0], seeds[0]);
            res.body[0].transactions.forEach((transaction, i) => {
              assertMatch(firstAccountTransactions[i], transaction);
            });
            done();
          });
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
            assertMatch(res.body, properPayload);
            done();
          });
      });
    });
  });

  describe('/accounts/:id', () => {
    describe('GET', () => {
      it('(200)', (done) => {
        request(app)
          .get('/accounts/1')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) done(err);
            assertMatch(res.body, seeds[0]);
            done();
          });
      });

      it('DNE (400)', (done) => {
        request(app)
          .get('/accounts/0')
          .expect(400)
          .end((err, res) => {
            if (err) done(err);
            assert.equal(res.text, 'No account with id 0');
            done();
          });
      });
    });

    describe('PUT', () => {
      it('name (200)', (done) => {
        request(app)
          .put('/accounts/7')
          .send(payloadNewName)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) done(err);
            assertMatch(res.body, payloadNewName);
            assert.notEqual(res.body.created_at, res.body.updated_at);
            done();
          });
      });

      it('DNE (400)', (done) => {
        request(app)
          .put('/accounts/0')
          .send(payloadNewName)
          .expect(400)
          .end((err, res) => {
            if (err) done(err);
            assert.equal(res.text, 'No account with id 0');
            done();
          });
      });
    });

    describe('DELETE', () => {
      it('(200)', (done) => {
        request(app)
          .delete('/accounts/7')
          .expect(204)
          .end((err) => {
            if (err) done(err);
            knex('accounts')
              .where('id', 7)
              .then(res => assert.lengthOf(res, 0))
              .then(done);
          });
      });

      it('DNE (400)', (done) => {
        request(app)
          .delete('/accounts/0')
          .expect(400, done);
      });
    });
  });
});
