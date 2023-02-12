/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie || !cookie.startsWith('jwt=')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = cookie.replace('jwt=', '');
  let payload;

  try {
    payload = jwt.verify(token, 'pro-letter-crypto');
  } catch (err) {
    if (err.code === 401) return next(new UnauthorizedError('Необходима авторизация'));
    next(err);
  }

  req.user = payload;

  next();
};
