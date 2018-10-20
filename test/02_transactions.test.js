const request = require('supertest');
const { assert } = require('chai');
// const knex = require('../db/queries/db');
const app = require('../app');

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

    });
  });
});
