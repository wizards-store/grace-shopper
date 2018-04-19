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
Product.belongsToMany(Category, { through: 'Product_Category' });
Category.belongsToMany(Product, { through: 'Product_Category' });

Order.belongsToMany(Product, { through: 'Order_Product' });
Product.belongsToMany(Order, { through: 'Order_Product' });

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
