const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT;

module.exports = function (req, res, next) {
  const header = req.header('x-auth-token');
  if (!header) return res.status(401).send('Access denied, no token provided');

  try {
    const validPayload = jwt.verify(header, jwtSecret);
    req.user = validPayload;
    next();
  } catch {
    res.status(400).send('Invalid token');
  }
};
