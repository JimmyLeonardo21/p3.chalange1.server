const UserController = require("../controllers/userController");

const router = require("express").Router();

router.post("/register", UserController.postRegister);
router.post("/login", UserController.postLogin);

module.exports = router;
