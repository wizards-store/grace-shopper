const router = require('express').Router();
const { Product } = require('../db/models');

router.get('/', (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.json(products);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  Product.create(req.body)
    .then(newProduct => res.status(201).json(newProduct))
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.update(req.body))
    .then(updatedProduct => res.json(updatedProduct))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then(product => product.destroy())
    .then(() => res.sendStatus(204))
    .catch(next);
});

module.exports = router;
