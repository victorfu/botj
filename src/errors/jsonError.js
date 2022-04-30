const httpStatus = require('http-status');

/**
 * Class representing an JSON API error.
 */

class JSONError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(exception, variable, data = null) {
    this.errorData = {};
    this.errorData.errorCode = exception.errorCode;
    this.origin = exception.origin;
    this.status = exception.status;
    if (data) {
      this.errorData.data = data;
    }
    if (exception.info) {
      this.errorData.info = exception.info;
    }
    switch (exception.status) {
      case 400:
        this.status = httpStatus.BAD_REQUEST;
        break;
      case 403:
        this.status = httpStatus.FORBIDDEN;
        break;
      case 404:
        this.status = httpStatus.NOT_FOUND;
        break;
      case 500:
        this.status = httpStatus.INTERNAL_SERVER_ERROR;
        break;
      case 502:
        this.status = httpStatus.BAD_GATEWAY;
        break;
      default:
        this.status = httpStatus.FORBIDDEN;
        break;
    }
  }
}

module.exports = JSONError;
