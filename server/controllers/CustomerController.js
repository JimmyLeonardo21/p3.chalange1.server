const { Post, User, Category, Tags } = require("../models");

class CustomerController {
  static async getNews(req, res, next) {
    try {
      const result = await Post.findAll({
        include: [
          {
            model: User,
          },
          {
            model: Category,
          },

          {
            model: Tags,
          },
        ],
      });
      res.status(200).json(result);
    } catch (err) {
      next({
        code: 500,
        message: err,
      });
    }
  }
  static async getDetailNews(req, res, next) {
    const { id } = req.params;
    try {
      const result = await Post.findOne({
        where: {
          id: +id,
        },
        include: {
          model: User,
        },
      });

      res.status(200).json(result);
    } catch (err) {
      next({
        code: 500,
        message: err,
      });
    }
  }
}

module.exports = CustomerController;
