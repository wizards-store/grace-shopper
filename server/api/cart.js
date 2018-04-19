const router = require('express').Router();
module.exports = router;

router.get('/', (req, res, next) => {
  res.status(200).json(req.session.cart);
});

// POST /cart
router.post('/', (req, res, next) => {
  const productToAdd = req.body;
  req.session.cart[productToAdd.id] = productToAdd;
  res.status(201).json(req.session.cart);
});
