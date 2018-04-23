const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const Order = require('./Order');
const Order_Product = require('./Order_Product');

/**
 * If we had any associations to make, this would be a great place to put them!
 */

// One-to-Many Associations
User.hasMany(Order);
Order.belongsTo(User, {
  foreignKey: {
    name: 'userId'
  },
});

// Many-to-Many Associations
Product.belongsToMany(Category, { through: 'Product_Category' });
Category.belongsToMany(Product, { through: 'Product_Category' });

Order.belongsToMany(Product, {
  through: Order_Product,
  foreignKey: 'orderId',
});
Product.belongsToMany(Order, {
  through: Order_Product,
  foreignKey: 'productId',
});

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Category,
  Order,
  Order_Product,
};
