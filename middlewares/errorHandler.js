/* eslint-disable consistent-return */
const { CODE_SERVERERROR } = require('../constants/constants');

const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.errorCode || CODE_SERVERERROR;
  const message = err.message || 'Ошибка на стороне сервера';
  res.status(statusCode).send({ message });

  next();
};

module.exports = errorHandler;
