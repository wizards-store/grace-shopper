const Sequelize = require('sequelize');
const db = require('../db');

// consider adding a price (at the order time) in this table so we retain accurate price information when the order was made

// could change to integer and add some more validations
const Order_Product = db.define('order_product', {
  quantity: {
    type: Sequelize.STRING,
  },
});

module.exports = Order_Product;
