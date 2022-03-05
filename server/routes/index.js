const router = require("express").Router();
const routerPost = require("./routerPost");
const routerUser = require("./routerUser");
const routerCustomer = require("./routerCustomer");
const { authentication } = require("../middleware/authentication");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.use("/users", routerUser);
router.use(authentication);
router.use("/customer", routerCustomer);

router.use("/post", routerPost);

module.exports = router;
