const { CODE_NOTFOUND } = require('../constants/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = CODE_NOTFOUND, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === CODE_NOTFOUND
        ? 'На сервере произошла ошибка'
        : message,
    });
};
