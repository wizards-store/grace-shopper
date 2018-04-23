const router = require('express').Router();
module.exports = router;

// GET /cart
router.get('/', (req, res, next) => {
  res.status(200).json(req.session.cart);
});

// POST /cart
// consider sending the bare minimum in terms of the product id
// { productId: quantity }
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

// DELETE /cart
router.delete('/:id', (req, res, next) => {
  const productToDelete = req.params.id;
  delete req.session.cart[productToDelete];
  // 204 means no content to send back - so don't actually send content back!
  // remove the `.json` part or send a 200 status
  res.status(204).json(req.session.cart);
});

// POST / cart subtract
// better to use a put request here (and update the cart) instead of adding a negative value - stay RESTful - rule of thumb: shouldn't need to use verbs in your URI's

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
