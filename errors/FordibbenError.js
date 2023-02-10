const { CODE_FORDIBBEN } = require('../constants/constants');

class FordibbenError extends Error {
  constructor(message) {
    super(message);
    this.errorCode = CODE_FORDIBBEN;
    this.name = 'FordibbenError';
  }
}

module.exports = FordibbenError;
