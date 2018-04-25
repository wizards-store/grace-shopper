/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../../server/db');
const Order = db.model('order');
const Product = db.model('product');

describe('Order_Product model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('Order_Product model', () => {
    beforeEach(async () => {
      const createdOrder = await Order.create({ total: 300 });
      const createdProduct = await Product.create({ name: 'Toy', price: 200 });
      await createdOrder.addProduct(createdProduct);
    });

    it('should have all associations', async () => {
      const createdOrder = await Order.findOne({ id: 1 });
      const products = await createdOrder.getProducts();
      expect(products.length).to.equal(1);
      expect(products[0].get().name).to.equal('Toy');
    });
  });
});
