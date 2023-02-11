/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const { CODE_UNAUTHORIZED } = require('../constants/constants');

module.exports = (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie || !cookie.startsWith('jwt=')) {
    return res
      .status(CODE_UNAUTHORIZED)
      .send({ message: 'Необходима авторизация1' });
  }

  const token = cookie.replace('jwt=', '');
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
