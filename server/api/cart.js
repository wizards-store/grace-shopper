const router = require('express').Router();
module.exports = router;

// POST /cart
router.post('/', (req, res, next) => {
  const productToAdd = req.body;
  req.session.cart[productToAdd.id] = productToAdd;
  res.status(201).json(req.session.cart);
});
