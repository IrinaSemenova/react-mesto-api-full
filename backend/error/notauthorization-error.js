// Неправильные почта или пароль
class NotAuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = NotAuthorizationError;
