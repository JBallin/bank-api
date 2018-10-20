const request = require('supertest');
const { assert } = require('chai');
// const knex = require('../db/queries/db');
const app = require('../app');
const { seeds } = require('../db/seeds/accounts');

const newTransaction = {
  title: 'Best Buy',
  amount: 20.12,
  pending: 1,
};

describe('transactions', () => {
  describe('/accounts/:id/transactions', () => {
    describe('GET', () => {
      it('(200)', (done) => {
        request(app)
          .get('/accounts/1/transactions')
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) done(err);
            assert.deepEqual(res, seeds[0].transactions);
            done();
          });
      });

      it('DNE (400)', (done) => {
        request(app)
          .get('/accounts/0/transactions')
          .expect(400)
          .end((err, res) => {
            if (err) done(err);
            assert.equal(res.text, 'No account with id 0');
            done();
          });
      });
    });

    describe('POST', () => {
      it('(200)', (done) => {
        request(app)
          .post('/accounts/1/transactions')
          .send(newTransaction)
          .expect(200)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) done(err);
            assert.equal(res.body, newTransaction);
            done();
          });
      });

      it('DNE (400)', (done) => {
        request(app)
          .post('/accounts/0/transactions')
          .expect(400)
          .end((err, res) => {
            if (err) done(err);
            assert.equal(res.text, 'No account with id 0');
            done();
          });
      });
    });
  });
});
