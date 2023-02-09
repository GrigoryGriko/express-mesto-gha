const { CODE_BADREQUEST } = require('../constants/constants');

class CastError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = CODE_BADREQUEST;
    this.name = 'CastError';
  }
}

module.exports = CastError;
