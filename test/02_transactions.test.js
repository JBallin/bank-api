const request = require('supertest');
const { assert } = require('chai');
const knex = require('../db/queries/db');
const app = require('../app');
const { seeds } = require('../db/seeds/01_transactions');
const { assertMatch } = require('./utils');

const newTransaction = {
  account_id: 4,
  title: 'Best Buy',
  amount: 20.12,
  pending: true,
};

describe('transactions', () => {
  describe('/transactions', () => {
    describe('GET', () => {
      it('(200)', (done) => {
        request(app)
          .get('/transactions')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) done(err);
            seeds.forEach((seed, i) => {
              assertMatch(res.body[i], seed);
            });
            done();
          });
      });
    });

    describe('POST', () => {
      it('(201)', (done) => {
        request(app)
          .post('/transactions')
          .send(newTransaction)
          .expect(201)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) done(err);
            assertMatch(res.body, newTransaction);
            done();
          });
      });
    });
  });

  describe('/transactions/:id', () => {
    describe('GET', () => {
      it('(200)', (done) => {
        request(app)
          .get('/transactions/7')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) done(err);
            assertMatch(res.body, newTransaction);
            done();
          });
      });

      it('DNE (400)', (done) => {
        request(app)
          .get('/transactions/0')
          .expect(400)
          .end((err, res) => {
            if (err) done(err);
            assert.equal(res.text, 'No transaction with id 0');
            done();
          });
      });
    });

    describe('PUT', () => {
      it('(200)', (done) => {
        request(app)
          .put('/transactions/7')
          .send({ pending: false })
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) done(err);
            assertMatch(res.body, { ...newTransaction, pending: false });
            done();
          });
      });

      it('DNE (400)', (done) => {
        request(app)
          .put('/transactions/0')
          .send({ pending: false })
          .expect(400)
          .end((err, res) => {
            if (err) done(err);
            assert.equal(res.text, 'No transaction with id 0');
            done();
          });
      });
    });

    describe('DELETE', () => {
      it('(204)', (done) => {
        request(app)
          .delete('/transactions/7')
          .expect(204)
          .end((err) => {
            if (err) done(err);
            knex('transactions')
              .where('id', 7)
              .then(res => assert.lengthOf(res, 0))
              .then(done);
          });
      });

      it('DNE (400)', (done) => {
        request(app)
          .delete('/transactions/0')
          .expect(400, done);
      });
    });
  });
});
