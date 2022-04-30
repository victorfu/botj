const _ = require('lodash');

function getSctIdByHeaders(req) {
  const { query = {} } = req;
  return !_.isEmpty(query.sctId) ? query.sctId : req.headers && !_.isEmpty(req.headers.sctid) ? req.headers.sctid : '';
}

module.exports = {
  getSctIdByHeaders,
};
