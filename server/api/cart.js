const router = require('express').Router();
module.exports = router;
const models = require('../db/models');
const Product = models.Product;
const Order = models.Order;
const Order_Product = models.Order_Product;
const Sequelize = require('sequelize');

// GET /cart
router.get('/', (req, res, next) => {
  res.status(200).json(req.session.cart);
});

// POST /cart
router.post('/', async (req, res, next) => {
  const productToAdd = req.body; // the product to add to cart

  if (req.user) {
    await Order.find({
      where: {
        userId: req.user.dataValues.id,
        isCheckedOut: false,
      },
    })
      .then(order => {
        console.log('what is order', order);
        if (order) {
          return Order_Product.find({
            where: {
              orderId: order.id,
              productId: productToAdd.id,
            },
          }).then(orderProduct => {
            orderProduct.update({
              quantity: orderProduct.quantity++,
            });
          });
        } else {
          Order.create({
            total: productToAdd.price,
            userId: req.user.dataValues.id,
          })
            .then(createdOrder => createdOrder.addProduct(productToAdd.id))
            .then(finalOrder => res.send(finalOrder));
        }
      })
      .catch(next);
  } else {
    // if the user is not logged in
    if (!req.session.cart[productToAdd.id]) {
      req.session.cart[productToAdd.id] = productToAdd;
      req.session.cart[productToAdd.id].quantity = Number(1);
      console.log(
        'what is productToAdd in guest user',
        req.session.cart[productToAdd.id]
      );
      res.status(201).json(req.session.cart[productToAdd.id]);
    } else {
      req.session.cart[productToAdd.id].quantity += 1;
      res.status(201).json(req.session.cart[productToAdd.id]);
    }
  }
});

// DELETE /cart
router.delete('/:id', (req, res, next) => {
  const productToDelete = req.params.id;
  delete req.session.cart[productToDelete];
  res.status(204).json(req.session.cart);
});

// POST / cart subtract
router.post('/subtract', (req, res, next) => {
  const productToDelete = req.body;

  if (req.session.cart[productToDelete.id].quantity === 1) {
    delete req.session.cart[productToDelete.id];
    res.status(204).json(req.session.cart);
  } else {
    req.session.cart[productToDelete.id].quantity -= 1;
    res.status(201).json(req.session.cart);
  }
});
