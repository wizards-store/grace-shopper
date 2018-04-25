/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../../server/db');
const Product = db.model('product');

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('Product model', () => {
    let frog;

    beforeEach(() => {
      return Product.create({
        name: 'frog',
        price: 599.99
      }).then(product => {
        // console.log(product.dataValues)
        frog = product;
      });
    });

    it('expects name to be string', () => {
      expect(frog.dataValues.name).to.be.a('string');
    });

    it('returns true if the price is Number', () => {
      expect(Number(frog.dataValues.price)).to.be.a('number');
    });
  });
  describe('Product Model', () => {
    it('expects to get validation error', done => {
      Product.create({
        name: '',
        price: 300
      }).catch(function (err) {
        expect(err.name).to.be.equal('SequelizeValidationError');
        done();
      });
    });
  });
  // end describe('instanceMethods')
}); // end describe('Product model')
