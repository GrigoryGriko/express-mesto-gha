/* eslint-disable consistent-return */
const { CODE_SERVERERROR } = require('../constants/constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.errorCode || CODE_SERVERERROR;
  const message = statusCode === 500 ? 'Ошибка сервера' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
