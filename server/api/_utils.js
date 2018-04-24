// this is an example of a gatekeeper middleware func
const isAdmin = (req, res, next) => {
  if (req.user.isAdmin) next();
  else res.sendStatus(401);
};

module.exports = isAdmin;
