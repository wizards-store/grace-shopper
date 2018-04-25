/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../../server/db');
const app = require('../../server/index');

describe('Wishlist routes', () => {
  describe('/api/wishlist', () => {

    it('GET /api/wishlist', (done) => {
      return request(app)
        .get('/api/wishlist')
        .expect(200)
        .then(res => {
          expect(res.body.to.be.an('object'));
        }, done());
    });
  });
});

