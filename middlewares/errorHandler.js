/* eslint-disable consistent-return */
const { CelebrateError } = require('celebrate');
const { CODE_SERVERERROR } = require('../constants/constants');

const errorHandler = (err, req, res, next) => {
  if (err instanceof CelebrateError) {
    return res.status(400).send(err.details.get('body').details[0].message);
  }
  const statusCode = err.statusCode || CODE_SERVERERROR;
  const message = err.message || 'Ошибка на стороне сервера';
  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;
