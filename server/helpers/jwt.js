const jwt = require("jsonwebtoken");

function createToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY);
}

function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET_KEY);
}

module.exports = {
  createToken,
  verifyToken,
};
