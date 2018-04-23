const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  total: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  submissionDate: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  sessionId: {
    type: Sequelize.STRING,
  },
});

module.exports = Order;
