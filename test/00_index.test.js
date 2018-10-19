const request = require('supertest');
const app = require('../app');

describe('/', () => {
  it('GET: status=200 type=html', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/, done);
  });
});
