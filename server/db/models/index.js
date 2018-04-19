const User = require('./User');
const Product = require('./Product');
const Category = require('./Category');

/**
 * If we had any associations to make, this would be a great place to put them!
 */

Product.hasMany(Category);
Category.belongsToMany(Product);

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Category
};
