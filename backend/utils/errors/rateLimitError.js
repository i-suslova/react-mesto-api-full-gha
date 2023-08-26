class RateLimitError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 429; // Код состояния 429 - Слишком много запросов
  }
}

module.exports = RateLimitError;
