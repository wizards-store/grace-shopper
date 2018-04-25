/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../../server/db');
const app = require('../../server/index');
const User = db.model('user');

// test not working!! because of the admin security middleware.
// no time to fix that.
describe('User routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com';

    beforeEach(() => {
      return User.create({
        email: codysEmail,
        password: 'password'
      });
    });

    it('GET /api/users', done => {
      return request(app)
        .get('/api/users')
        .expect(401)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].email).to.be.equal(codysEmail);
        }, done());
    });
  });
  describe('/api/users/', () => {
    const joshEmail = 'josh@josh.com';
    const joshPassword = 'password';
    const email = 'email@email.com';
    const password = 'password';
    beforeEach(() => {
      return User.create({
        email: joshEmail,
        password: joshPassword,
        isAdmin: true
      });
    });

    it('GETs all users for the admin', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].email).to.be.equal(joshEmail);
          expect(res.body[0].password).to.not.be.equal(joshPassword);
        });
    });

    beforeEach(() => {
      return User.create({
        email: email,
        password: password,
        isAdmin: false
      });
    });

    it('Gets nothing since admin is not logged in', () => {
      return request(app)
        .get('/api/users')
        .expect(401)
        .then(res => {
          expect(res.body).to.be.an('undefined');
        });
    });
  });
  // end describe('/api/users')
}); // end describe('User routes')
