const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    price: {
        type: Sequelize.DECIMAL,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT
    },
    inventory: {
        type: Sequelize.INTEGER
    },
    photo: {
        type: Sequelize.STRING,
        defaultValue: 'https://nerdist.com/wp-content/uploads/2015/10/harry-potter-image.jpg'
    }
});

module.exports = Product;
