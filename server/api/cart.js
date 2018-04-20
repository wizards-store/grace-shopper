const router = require('express').Router();
module.exports = router;

// GET /cart
router.get('/', (req, res, next) => {
  res.status(200).json(req.session.cart);
});

// POST /cart
router.post('/', (req, res, next) => {
  const productToAdd = req.body;

  if (!req.session.cart[productToAdd.id]) {
    req.session.cart[productToAdd.id] = productToAdd;
    req.session.cart[productToAdd.id].quantity = Number(1);
    res.status(201).json(req.session.cart[productToAdd.id]);
  } else {
    req.session.cart[productToAdd.id].quantity += 1;
    res.status(201).json(req.session.cart[productToAdd.id]);
  }
});
