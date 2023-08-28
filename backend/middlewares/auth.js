const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../utils/errors/indexErrors');

module.exports.authUser = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Необходима 11авторизация'));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    next(new UnauthorizedError('Необходима 22авторизация'));
    return;
  }

  req.user = payload;

  next();
};
