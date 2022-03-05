const bcrypt = require("bcrypt");

function hashPassword(planPassword) {
  const salt = bcrypt.genSaltSync(8);
  return bcrypt.hashSync(planPassword, salt);
}

function comparePassword(planPassword, hashPassword) {
  return bcrypt.compareSync(planPassword, hashPassword);
}

module.exports = {
  hashPassword,
  comparePassword,
};
