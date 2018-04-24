const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

// AP: TODO- put gatekeeperMiddleware in a `utils` module to be used here and elsewhere
// should be on most of your routes on the backend

// this is an example of a gatekeeper middleware func
const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) next();
  else res.sendStatus(401);
};

// router.<method> takes an unlimited number of middleware funcs
router.get('/', isAdmin, (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next);
});
