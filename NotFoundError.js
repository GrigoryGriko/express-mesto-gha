const { CODE_NOTFOUND } = require('./constants/constants');

class NNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = CODE_NOTFOUND;
    this.name = 'NotFoundError';
  }
}

module.exports = NNotFoundError;
