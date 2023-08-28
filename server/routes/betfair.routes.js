const router = require("express").Router();

const betfairController = require("../controllers/betfair.controller");

router.get("/get-competitions", betfairController.getCompetition);
router.post("/list-events/:eventTypeId", betfairController.listEvents);
router.post(
  "/list-market-catalogue/:eventId",
  betfairController.listMarketCatalogue
);
router.post("/list-market-book/:marketId", betfairController.listMarketBook);

router.get("/list-countries", betfairController.listCountries);

module.exports = router;
