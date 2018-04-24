const { expect } = require('chai');
const db = require('../../server/db');
const Order = db.model('order');

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });

  describe('model definition', () => {
    let order;

    beforeEach(() => {
      return Order.create({
        total: 300
      }).then(createdOrder => {
        order = createdOrder;
      });
    });

    it('stores the total order amount', () => {
      expect(order.total).to.equal('300');
    });

    it(`stores 'false' as the the default value for 'isCheckedOut'`, () => {
      expect(order.isCheckedOut).to.equal(false);
    });
  });
}); // end describe('Order model')
