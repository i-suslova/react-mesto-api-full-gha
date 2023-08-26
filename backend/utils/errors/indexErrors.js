const BadRequestError = require('./badRequestError');
const UnauthorizedError = require('./unauthorizedError');
const ForbiddenError = require('./forbiddenError');
const NotFoundError = require('./notFoundError');
const ConflictError = require('./conflictError');
const RateLimitError = require('./conflictError');

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  RateLimitError,
};
