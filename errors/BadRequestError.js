const { CODE_BADREQUEST } = require('../constants/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = CODE_BADREQUEST;
  }
}

module.exports = BadRequestError;
