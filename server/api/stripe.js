const router = require('express').Router();
const stripe = require('stripe')('sk_test_ibefYumuvwyQ0Piy5PEkzKb8');
const _ = require('lodash');
const Sequelize = require('sequelize');
const models = require('../db/models');
const Order = models.Order;
const Product = models.Product;
const Order_Product = models.Order_Product;
module.exports = router;

router.post('/', async (req, res, next) => {
  const total = () => {
    const cart = req.session.cart;
    let sum = 0;
    Object.values(cart).forEach(product => {
      sum += +(product.price * product.quantity);
    });
    return sum * 100;
  };

  // define total as a pure function (takes cart as input, returns a number which is the total)
  const charge = await stripe.charges.create({
    amount: Number(total()),
    currency: 'usd',
    description: 'wizard supply shop',
    source: req.body.id,
  });

  // don't forget to catch errors!
  // maybe you leave the catching of errors as a try, catch statement

  const predicate = (value, key) => {
    return key.startsWith('id') || key.startsWith('quantity');
  };

  // [{id: 1, name: 'hehe', ..}, {id: 2, ...}]
  const arrayOfProducts = Object.values(req.session.cart);
  const productObj = arrayOfProducts.map(filterObj => {
    return _.pickBy(filterObj, predicate);
  });

  await Order.create({
    total: charge.amount,
    sessionId: req.session.id,
  })

  // do the math before updating inventory
    .then(newOrder => {
      productObj.forEach(product => {
        Product.update(
          { inventory: Sequelize.literal(`inventory - ${product.quantity}`) },
          {
            where: { id: product.id },
          }
        );
      });

      productObj.forEach(product => {
        return Order_Product.create({
          orderId: newOrder.id,
          productId: product.id,
          quantity: product.quantity,
        });
      });

      req.session.cart = {};
    })
    .then(() => {
      res.status(201).json(req.session.cart);
    })
    .catch(next);
});
