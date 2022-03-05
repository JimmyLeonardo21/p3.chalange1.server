const CategoryController = require("../controllers/CategoryController");
const PostController = require("../controllers/PostController");
const router = require("express").Router();

router.get("/", PostController.getNews);
router.post("/", PostController.postNews);

router.get("/category", CategoryController.getCategory);
router.post("/category", CategoryController.postCategory);
router.delete("/category/:id", CategoryController.deleteCategory);

router.delete("/:id", PostController.deleteNews);
router.put("/:id", PostController.putNews);
router.get("/:id", PostController.getDetailNews);

module.exports = router;
