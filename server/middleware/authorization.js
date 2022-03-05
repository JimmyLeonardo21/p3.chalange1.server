const { Movie } = require("../models");

async function authorization(req, res, next) {
  if (req.user.role === "admin") {
    return next();
  }
  try {
    const { id } = req.params;
    const result = await Movie.findByPk(id);
    if (result.authorId === req.user.id) {
      next();
    } else {
      throw new Error();
    }
  } catch (err) {
    next({
      code: 403,
      message: "unAuthorized Access",
    });
  }
}

module.exports = {
  authorization,
};
