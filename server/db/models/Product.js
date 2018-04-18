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
        defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ_TkUBCyPp2wqsBYH3uFPSbakLS7sxXHCz5H3aWZZnjrES4bb'
    }
});

module.exports = Product;
