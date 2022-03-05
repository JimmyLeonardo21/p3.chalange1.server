const CustomerController = require("../controllers/CustomerController");

const router = require("express").Router();

router.get("/", CustomerController.getNews);

router.get("/:id", CustomerController.getDetailNews);

module.exports = router;
