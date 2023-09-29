const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;

describe('Users API Tests', () => {
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

  it('should add a new user', (done) => {
    const newUser = {
      name: 'John Doe',
      email: 'jd@example.com',
    };

    request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('_id');
        expect(res.body.name).to.equal(newUser.name);
        done();
      });
  });
});