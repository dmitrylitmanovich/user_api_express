const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;

describe('API Tests', () => {
  it('should get a list of all users', (done) => {
    request(app)
      .get('/api/users')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });
});