const { CODE_BADREQUEST } = require('../constants/constants');

class FordibbenError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = CODE_BADREQUEST;
  }
}

module.exports = FordibbenError;
