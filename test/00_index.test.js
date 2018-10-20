const request = require('supertest');
const app = require('../app');

describe('index', () => {
  it('GET (200)', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/, done);
  });
  it('POST (404)', (done) => {
    request(app)
      .post('/')
      .expect(404, done);
  });
});
