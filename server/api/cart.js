const router = require('express').Router();
module.exports = router;
const models = require('../db/models');
const Product = models.Product;
const Order = models.Order;
const Order_Product = models.Order_Product;
const Sequelize = require('sequelize');
const _ = require('lodash');

async function findFunction (userId) {
  const order = await Order.find({
    where: {
      userId: userId,
      isCheckedOut: false,
    },
  });

  const cart = await Order_Product.findAll({
    where: {
      orderId: order.id,
    },
    raw: true,
  });

  const predicate = (value, key) => {
    return key.startsWith('quantity') || key.startsWith('productId');
  };

  const productArr = cart.map(itemObj => {
    return _.pickBy(itemObj, predicate);
  });

  const productIdAndQuantityObj = _.mapValues(
    _.keyBy(productArr, 'productId'),
    'quantity'
  );

  return productIdAndQuantityObj;
}

// GET /cart
router.get('/', async (req, res, next) => {
  if (req.user) {
    const cart = await Order.find({
      where: {
        userId: req.user.dataValues.id,
        isCheckedOut: false,
      },
    });

    if (cart) {
      const cartItems = await Order_Product.findAll({
        where: {
          orderId: cart.id,
        },
        raw: true,
      });

      const predicate = (value, key) => {
        return key.startsWith('quantity') || key.startsWith('productId');
      };

      const productArr = cartItems.map(itemObj => {
        return _.pickBy(itemObj, predicate);
      });

      const productIdAndQuantityObj = _.mapValues(
        _.keyBy(productArr, 'productId'),
        'quantity'
      );
      res.json(productIdAndQuantityObj);
    } else {
      const fetchCart = await findFunction(req.user.dataValues.id);
      res.status(201).json(fetchCart);
    }
  } else {
    res.json(req.session.cart);
  }
});

// POST /cart
router.post('/', async (req, res, next) => {
  const productToAdd = req.body; // the product to add to cart

  if (req.user) {
    const cart = await Order.find({
      where: {
        userId: req.user.dataValues.id,
        isCheckedOut: false,
      },
    });

    if (cart) {
      const cartItems = await Order_Product.find({
        where: {
          orderId: cart.id,
          productId: productToAdd.id,
        },
      });

      if (cartItems) {
        await cartItems.update({
          quantity: Sequelize.literal(`quantity + 1`),
        });

        const fetchCart = await findFunction(req.user.dataValues.id);
        res.status(201).json(fetchCart);
      } else {
        await Order_Product.create({
          orderId: cart.id,
          productId: productToAdd.id,
          quantity: 1,
        });

        const fetchCart = await findFunction(req.user.dataValues.id);
        res.status(201).json(fetchCart);
      }
    } else {
      const createdOrder = await Order.create({
        userId: req.user.dataValues.id,
      });

      await Order_Product.create({
        orderId: createdOrder.id,
        productId: productToAdd.id,
        quantity: 1,
      });

      const fetchCart = await findFunction(req.user.dataValues.id);
      res.status(201).json(fetchCart);
    }
  } else {
    // if the user is not logged in
    if (!req.session.cart[productToAdd.id]) {
      req.session.cart[productToAdd.id] = productToAdd;
      req.session.cart[productToAdd.id].quantity = 1;
      res.status(201).json(req.session.cart);
    } else {
      req.session.cart[productToAdd.id].quantity += 1;
      res.status(201).json(req.session.cart);
    }
  }
});

// DELETE /cart
router.delete('/:id', async (req, res, next) => {
  if (req.user) {
    const cart = await Order.find({
      where: {
        userId: req.user.dataValues.id,
        isCheckedOut: false,
      },
    });
    await Order_Product.destroy({
      where: {
        orderId: cart.id,
        productId: req.params.id,
      },
    });

    const fetchCart = await findFunction(req.user.dataValues.id);
    res.status(201).json(fetchCart);
  } else {
    const productToDelete = req.params.id;
    delete req.session.cart[productToDelete];
    res.status(201).json(req.session.cart);
  }
});

// POST / cart subtract
router.put('/', async (req, res, next) => {
  const productToDelete = req.body;

  if (req.user) {
    const cart = await Order.find({
      where: {
        userId: req.user.dataValues.id,
        isCheckedOut: false,
      },
    });

    const cartItems = await Order_Product.find({
      where: {
        orderId: cart.id,
        productId: productToDelete.id,
      },
    });

    await cartItems.update({
      quantity: Sequelize.literal(`quantity - 1`),
    });

    const fetchCart = await findFunction(req.user.dataValues.id);
    res.status(201).json(fetchCart);
  } else {
    // if the user is not logged in
    if (req.session.cart[productToDelete.id].quantity === 1) {
      delete req.session.cart[productToDelete.id];
      res.status(204).json(req.session.cart);
    } else {
      req.session.cart[productToDelete.id].quantity -= 1;
      res.status(201).json(req.session.cart);
    }
  }
});
