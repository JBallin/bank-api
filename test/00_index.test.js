const request = require('supertest');
const app = require('../app');

describe('/', () => {
  it('GET (200)', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/, done);
  });
});
