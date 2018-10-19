const request = require('supertest');
const app = require('../app');

describe('/', () => {
  it('GET', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/, done);
  });
});
