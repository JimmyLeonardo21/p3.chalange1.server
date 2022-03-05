const { Post, Category, User, Tags } = require("../models");
const { sequelize } = require("../models");
class PostController {
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
  static async postNews(req, res, next) {
    const t = await sequelize.transaction();
    const { title, content, imgUrl, categoryId, tags1, tags2, tags3 } =
      req.body;
    const userId = req.user.id;
    const formatTitle = title.split(" ");
    const result = formatTitle.join("-");
    try {
      const news = await Post.create(
        {
          title,
          slug: result,
          content,
          imgUrl,
          categoryId,
          authorId: userId,
        },
        { returning: true, transaction: t }
      );
      console.log(news.id, "dlsdjhjshdkjshdkjhs");
      const formatTag = [tags1, tags2, tags3];
      let data = formatTag.map((el) => {
        return {
          postId: news.id,
          name: el,
        };
      });

      const tag = await Tags.bulkCreate(data, {
        returning: true,
        transaction: t,
      });
      console.log(tag);
      await t.commit();

      res.status(201).json({ message: "Post created" });
    } catch (err) {
      await t.rollback();
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
  static async putNews(req, res, next) {
    console.log("masuk ga");
    try {
      const { id } = req.params;
      const { title, content, imgUrl, categoryId, authorId } = req.body;

      const data = title.split(" ");
      const result = data.join("-");

      const findByPk = await Post.findByPk(+id);
      if (findByPk) {
        const dataUpdate = await Post.update(
          {
            title,
            slug: result,
            content,
            imgUrl,
            categoryId,
            authorId,
          },
          {
            where: {
              id: +id,
            },
            returning: true,
          }
        );
        res.status(200).json([dataUpdate[1][0]]);
      } else {
        throw { message: "News Not Found", code: 404 };
      }
    } catch (err) {
      if (err.name === "SequelizeValidationError") {
        const error = err.errors.map((el) => el.message);

        next({
          code: 400,
          message: error,
        });
      } else {
        next(err);
      }
    }
  }
  static async deleteNews(req, res, next) {
    const { id } = req.params;
    try {
      const result = await Post.destroy({
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

module.exports = PostController;
