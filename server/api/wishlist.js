const router = require('express').Router();
module.exports = router;
const models = require('../db/models');
const Product = models.Product;
const Sequelize = require('sequelize');
const _ = require('lodash');

// GET /wishlist
router.get('/', (req, res, next) => {
  if (req.user) { // wishlist is only for users
    res.json(req.session.wishlist);
  }
});

// POST /wishlist
router.post('/', (req, res, next) => {
  if (req.user) {
    const productToAdd = req.body; // the product to add to wishlist
    if (!req.session.wishlist[productToAdd.id]) {
      req.session.wishlist[productToAdd.id] = productToAdd;
    }
    res.status(201).json(req.session.wishlist);
  }
});

// DELETE /wishlist
router.delete('/:id', (req, res, next) => {
  if (req.user) {
    const productToDelete = req.params.id;
    delete req.session.wishlist[productToDelete];
    res.status(404).json(req.session.wishlist);
  }
});
