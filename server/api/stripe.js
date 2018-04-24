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
  if (req.user) {
    const order = await Order.find({
      where: {
        userId: req.user.dataValues.id,
        isCheckedOut: false,
      }
    });
    await order.update({
      total: 1000, // FIX 
      isCheckedOut: true,
    });
    res.status(201).json({});
  } else {
    const total = (cart) => {
      let sum = 0;
      Object.values(cart).forEach(product => {
        sum += +(product.price * product.quantity);
      });
      return sum * 100;
    };
    const charge = await stripe.charges.create({
      amount: total(req.session.cart),
      currency: 'usd',
      description: 'wizard supply shop',
      source: req.body.id,
    });

    const predicate = (value, key) => {
      return key.startsWith('id') || key.startsWith('quantity');
    };
    
    // [{id: 1, name: 'hehe', ..}, {id: 2, ...}]
    const arrayOfProducts = Object.values(req.session.cart);
    const productArr = arrayOfProducts.map(filterObj => {
      return _.pickBy(filterObj, predicate);
    });

    const newOrder = await Order.create({
      total: charge.amount,
      sessionId: req.session.id,
      isCheckedOut: true,
    });

    await productArr.forEach(product => {
      Product.update(
        { inventory: Sequelize.literal(`inventory - ${product.quantity}`) },
        {
          where: { id: product.id },
        }
      );
    });

    await productArr.forEach(product => {
      return Order_Product.create({
        orderId: newOrder.id,
        productId: product.id,
        quantity: product.quantity,
      });
    });

    req.session.cart = {};

    res.status(201).json(req.session.cart);
  }
});
