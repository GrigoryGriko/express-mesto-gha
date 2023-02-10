const { CODE_CONFLICTINGREQUEST } = require('../constants/constants');

class ConflictingRequestError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = CODE_CONFLICTINGREQUEST;
    this.name = 'ConflictingRequestError';
  }
}

module.exports = ConflictingRequestError;
