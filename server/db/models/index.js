const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');
const Order = require('./Order');

/**
 * If we had any associations to make, this would be a great place to put them!
 */

// One-to-Many Associations
User.hasMany(Order);
Order.belongsTo(User);

// Many-to-Many Associations
Product.hasMany(Category);
Category.belongsToMany(Product);

Order.hasMany(Product);
Product.belongsToMany(Order);

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
  Order
};
