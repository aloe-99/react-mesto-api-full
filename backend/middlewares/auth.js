/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');

const AuthorizationError = require('../errors/AuthorizationError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    next(new AuthorizationError('Ошибка авторизации'));
  }

  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new AuthorizationError('Ошибка авторизации'));
  }
  req.user = payload;

  next();
};
