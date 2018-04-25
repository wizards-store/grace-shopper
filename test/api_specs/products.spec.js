/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const db = require('../../server/db');
const app = require('../../server/index');
const Product = db.model('product');

describe('Products routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('GET /api/products/', () => {
    it('it should GET all the products', () => {
      return request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.equal(0);
        });
    });
  });

  describe('POST /api/products/', () => {
    beforeEach(() => {
      return db.sync({ force: true });
    });

    const productObj = {
      name: 'frog',
      price: 43.21,
    };

    beforeEach(() => {
      return Product.create(productObj);
    });

    it('it should POST a product', () => {
      return request(app)
        .post('/api/products')
        .send(productObj)
        .expect(201)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('price');
        });
    });
  });

  describe('GET /api/products/:id', () => {
    beforeEach(() => {
      return db.sync({ force: true });
    });

    const productObj = {
      id: 1,
      name: 'frog',
      price: 43.21,
    };

    beforeEach(() => {
      return Product.create(productObj);
    });

    it('it should GET a product by the given id', () => {
      return request(app)
        .get('/api/products/' + productObj.id)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('name');
          expect(res.body).to.have.property('price');
          expect(res.body)
            .to.have.property('id')
            .equal(productObj.id);
        });
    });
  });

  describe('PUT /api/products/:id', () => {
    beforeEach(() => {
      return db.sync({ force: true });
    });

    const productObj = {
      id: 1,
      name: 'frog',
      price: 43.21,
    };

    beforeEach(() => {
      return Product.create(productObj);
    });

    it('it should UPDATE a product given the id', () => {
      return request(app)
        .put('/api/products/' + productObj.id)
        .send({ name: 'frog', price: 50.22 })
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body)
            .to.have.property('name')
            .equal('frog');
        });
    });
  });

  describe('DELETE /api/products/:id', () => {
    beforeEach(() => {
      return db.sync({ force: true });
    });

    const productObj = {
      id: 1,
      name: 'frog',
      price: 43.21,
    };

    beforeEach(() => {
      return Product.create(productObj);
    });

    it('it should DELETE a product given the id', () => {
      return request(app)
        .delete('/api/products/' + productObj.id)
        .send({ name: 'frog', price: 50.22 })
        .expect(204)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(Object.keys(res.body).length).to.be.equal(0);
        });
    });
  });
});
