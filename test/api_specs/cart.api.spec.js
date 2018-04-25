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
    const fakeUser = {
      email: 'josh@email.com'
    };

    const fakeProduct = {
      name: 'Nimbus 2000',
      price: 300,
      description: `Harry's first broom`,
      category: 'broom'
    };

    beforeEach(() => {
      return User.create(fakeUser).then(() => Product.create(fakeProduct));
    });

    it('posts a cart to the Order model', () => {
      return request(app)
        .post('/api/cart', fakeProduct)
        .expect(201)
        .then(res => {
          expect(res.body).to.equal(fakeProduct);
        });
    });
  });
});
