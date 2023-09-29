const request = require('supertest');
const expect = require('chai').expect;
const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');

const app = require('../app');

const User = require('../models/user');

describe('Users API Tests', () => {
  let temporaryUser;

  before(async () => {
    temporaryUser = new User({
      name: faker.name.firstName(),
      email: faker.internet.email(),
    });

    await temporaryUser.save();
  });

  after(async () => {
    await User.findByIdAndRemove(temporaryUser._id);
  });

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

  it('should update a user', (done) => {
    const updatedUser = {
      name: 'Updated Name',
      email: 'updated@example.com',
    };

    request(app)
      .put(`/api/users/${temporaryUser._id}`)
      .send(updatedUser)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.name).to.equal(updatedUser.name);
        expect(res.body.email).to.equal(updatedUser.email);
        done();
      });
  });

  it('should delete a user', (done) => {
    request(app)
      .delete(`/api/users/${temporaryUser._id}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal('User removed');
        done();
      });
  });
});
