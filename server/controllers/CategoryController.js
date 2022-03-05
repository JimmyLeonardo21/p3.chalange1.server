const { Category } = require("../models");

class CategoryController {
  static async getCategory(req, res, next) {
    try {
      const result = await Category.findAll();
      res.status(200).json(result);
    } catch (err) {
      next({
        code: 500,
        message: err,
      });
    }
  }
  static async postCategory(req, res, next) {
    const { name } = req.body;
    try {
      const result = await Category.create({
        name,
      });
      res.status(200).json(result);
    } catch (err) {
      next({
        code: 500,
        message: err,
      });
    }
  }
  static async deleteCategory(req, res, next) {
    const { id } = req.params;
    try {
      const result = await Category.destroy({
        where: {
          id: +id,
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

module.exports = CategoryController;
