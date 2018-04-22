const Sequelize = require('sequelize');
const db = require('../db');

const Order_Product = db.define('order_product', {
  quantity: {
    type: Sequelize.STRING,
  },
});

module.exports = Order_Product;
