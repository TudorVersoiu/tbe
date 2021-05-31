const authorization = (policy) => {
  return (req, res, next) => {
    if ( !policy(req.user) ) {
      return res.sendStatus(401);
    }
    next();
  }
}

module.exports = authorization;
