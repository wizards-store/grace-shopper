const router = require('express').Router();
const stripe = require('stripe')('sk_test_ibefYumuvwyQ0Piy5PEkzKb8');
const _ = require('lodash');
const Sequelize = require('sequelize');
const models = require('../db/models');
const Order = models.Order;
const User = models.User;
const Product = models.Product;
const Order_Product = models.Order_Product;
module.exports = router;

router.post('/', async (req, res, next) => {
  console.log('what is req.session', req.session);
  console.log('what is req.session.sid', req.session.id);

  const total = () => {
    const cart = req.session.cart;
    let sum = 0;
    Object.values(cart).forEach(product => {
      sum += +(product.price * product.quantity);
    });
    return sum * 100;
  };

  const charge = await stripe.charges.create({
    amount: Number(total()),
    currency: 'usd',
    description: '$5 for 5 credits',
    source: req.body.id,
  });

  const predicate = (value, key) => {
    return key.startsWith('id') || key.startsWith('quantity');
  };

  const predicateId = (value, key) => {
    return key.startsWith('id');
  };

  const predicateQuantity = (value, key) => {
    return key.startsWith('quantity');
  };

  // [{id: 1, name: 'hehe', ..}, {id: 2, ...}]
  const arrayOfProducts = Object.values(req.session.cart);
  const productObj = arrayOfProducts.map(filterObj => {
    return _.pickBy(filterObj, predicate);
  });

  // [{id: 1, quantity: 2}]

  const productIdArray = arrayOfProducts.map(filterObj => {
    return _.pickBy(filterObj, predicateId).id;
  });

  const productQuantityArray = arrayOfProducts.map(filterObj => {
    return _.pickBy(filterObj, predicateQuantity).quantity;
  });

  const order1 = await Order.create({
    total: charge.amount,
    submissionDate: null,
    sessionId: req.session.id,
  })
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
    })
    .then(() => res.sendStatus(201))
    .catch(next);

  // var order = Order.build();
  // await order1.setUser(req.session.id);

  console.log('what is the charge', charge);

  // res.status(201).json(charge);
});
