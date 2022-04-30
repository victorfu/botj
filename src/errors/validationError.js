const httpStatus = require('http-status');

class ValidationError {
  constructor(error) {
    this.error = error;
    switch (error.status) {
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

module.exports = ValidationError;
