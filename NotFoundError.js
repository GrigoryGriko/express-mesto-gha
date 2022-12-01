const { CODE_NOTFOUND } = require('./constants/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = CODE_NOTFOUND;
    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
