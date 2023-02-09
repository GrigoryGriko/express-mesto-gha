const { CODE_UNAUTHORIZED } = require('../constants/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = CODE_UNAUTHORIZED;
    this.name = 'UnauthorizedError';
  }
}

module.exports = UnauthorizedError;
