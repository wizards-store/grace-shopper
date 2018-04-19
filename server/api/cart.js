const router = require('express').Router();
module.exports = router;

// GET /cart
router.get('/', (req, res, next) => {
  res.status(200).json(req.session.cart);
});

// POST /cart
router.post('/', (req, res, next) => {
  const productToAdd = req.body;
  req.session.cart[productToAdd.id] = productToAdd;
  res.status(201).json(req.session.cart);
});

// DELETE /cart
router.delete('/', (req, res, next) => {
  const productToDelete = req.body;
  delete req.session.cart[productToDelete.id];
  res.status(204).json(req.session.cart);
});
