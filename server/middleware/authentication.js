const jwt = require("jsonwebtoken");
const { verifyToken } = require("../helpers/jwt");
function authentication(req, res, next) {
  if (!req.headers.access_token) {
    next({
      code: 401,
      message: "No Access",
    });
  } else {
    try {
      const decoded = verifyToken(req.headers.access_token);
      req.user = decoded;
      next();
    } catch (err) {
      next({
        code: 401,
        message: "No Access",
      });
    }
  }
}

module.exports = {
  authentication,
};
