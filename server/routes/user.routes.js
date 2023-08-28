const router = require("express").Router();
const verifyUser = require("../middlewares/authenticate");
const userController = require("../controllers/user.controller");

router.post("/login", userController.userLogin);
router.get("/me", verifyUser, userController.loadUserProfile);
module.exports = router;
