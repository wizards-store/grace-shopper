const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  total: {
    type: Sequelize.DECIMAL,
    // allowNull: false,
    // validate: {
    //   min: 0,
    // },
  },
  submissionDate: {
    type: Sequelize.DATE,
  },
  sessionId: {
    type: Sequelize.STRING,
  },
  isCheckedOut: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Order;
