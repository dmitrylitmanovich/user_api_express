const request = require('supertest');
const app = require('../app');
const expect = require('chai').expect;

describe('Users API', () => {
  it('should get a list of all users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an('array');
  });
});
