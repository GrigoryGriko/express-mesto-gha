/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { CODE_UNAUTHORIZED } = require('../constants/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(authorization);

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(CODE_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация1' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'pro-letter-crypto');
  } catch (err) {
    return res
      .status(CODE_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация2' });
  }

  req.user = payload;

  next();
};
