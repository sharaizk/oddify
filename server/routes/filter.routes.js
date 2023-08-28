const router = require("express").Router();

const { saveFilter, getFilters } = require("../controllers/filter.controller");
const verifyToken = require("../middlewares/authenticate");

router.post("/new-filter", verifyToken, saveFilter);
router.get("/my-filters", verifyToken, getFilters);
module.exports = router;
