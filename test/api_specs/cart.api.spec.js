const { expect } = require('chai');
const request = require('supertest');
const db = require('../../server/db');
const app = require('../../server/index');
const User = db.model('user');
const Product = db.model('product');
const Order = db.model('order');

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('/api/cart', () => {
    beforeEach(() => {
      return Order.create({});
    });
  });
});

/*

-req.body needs to look like this:
{
  name: 'Nimbus 2000',
  price: 300,
  description: 'Harry's first broom',
  category: 'broom'
}


*/
