const JSONError = require('../errors/jsonError');
const ValidationError = require('../errors/validationError');
const APIError = require('../errors/apiError');
const httpStatus = require('http-status');
const { env } = require('../config');

const errorConverter = (req, res, next) => {
  const err = new APIError(`API([${req.method}]${decodeURIComponent(req.url)}) not found`, httpStatus.NOT_FOUND);
  return next(err);
};

const errorHandler = (err, req, res, next) => {
  let apiError;
  if (err instanceof JSONError) {
    const obj = {
      code: err.errorData.errorCode,
      errorData: err.errorData,
      origin: err.origin,
    };
    if (err.errorData.data) {
      obj.errorData.data = err.errorData.data;
    }
    if (err.errorData.info) {
      obj.errorData.info = err.errorData.info;
    }
    res.status(err.status).send(obj);
    return;
  } else if (err instanceof ValidationError) {
    res.status(err.status).json(err.error);
    return;
  } else if (!(err instanceof APIError)) {
    apiError = new APIError(`${err.message} ([${req.method}]${decodeURIComponent(req.url)})`, err.status, err.isPublic);
  } else {
    apiError = err;
  }

  // send stacktrace only during development
  res.status(apiError.status).json({
    message: apiError.isPublic ? apiError.message : httpStatus[apiError.status],
    stack: env === 'development' ? err.stack : {},
  });
};

module.exports = {
  errorHandler,
  errorConverter,
};
