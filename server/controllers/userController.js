const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
class UserController {
  static async postRegister(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const dataUser = await User.create({
        username,
        email,
        password,
        role: "admin",
        phoneNumber,
        address,
      });
      res.status(201).json({ id: dataUser.id, email: dataUser.email });
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        const error = err.errors.map((el) => el.message);
        next({
          code: 400,
          message: error,
        });
      } else {
        next({
          code: 500,
          message: err,
        });
      }
    }
  }
  static async postLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (user) {
        const isValidPassword = comparePassword(password, user.password);
        if (isValidPassword) {
          const payload = { id: user.id, email: user.email, role: user.role };
          const access_token = createToken(payload);
          res.status(200).json({
            message: "Login Successfull",
            accessToken: access_token,
          });
        } else {
          throw { message: "invalid email or password", code: 401 };
        }
      } else {
        throw { message: "invalid email or password", code: 401 };
      }
    } catch (err) {
      console.log("masuk sini", err);
      next(err);
    }
  }
}

module.exports = UserController;
