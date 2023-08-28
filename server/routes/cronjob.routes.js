const router = require("express").Router();
const cron = require("node-cron");

const {
  fetchMarketRunners,
  fetchEvents,
  fetchEventMarketBooks,
  calculateRunnerChange,
  handlePrematchToLive,
  handleEventDeletion,
} = require("../controllers/cronjob.controller");

const { keepAliver } = require("../helpers/betfairInstance");

const handleData = async () => {
  try {
    console.log("FETCHING EVENTS");
    await fetchEvents();
    console.log("FETCHING MARKETBOOKS");
    await fetchEventMarketBooks();
    console.log("FETCHING MARKET RUNNERS");
    await fetchMarketRunners();
    console.log("HANDLE DATA DONE");
  } catch (e) {
    console.log(e);
  }
};

const handleDataCron = cron.schedule("0 0 * * *", () => {
  console.log("STARTING HANDLE DATA");
  handleData();
  handleEventDeletion();
});
// handleEventDeletion()

const oneMinuteCrons = cron.schedule("*/1 * * * *", () => {
  calculateRunnerChange();
});
// calculateRunnerChange();

const fiveMinuteCrons = cron.schedule("*/5 * * * *", () => {
  keepAliver();
  handlePrematchToLive();
});

if (process.env.ENV === "PROD") {
  console.log("CRONS");
  handleDataCron.start();
  oneMinuteCrons.start();
  fiveMinuteCrons.start();
} else if (process.env.ENV === "DEV") {
  oneMinuteCrons.stop();
  handleDataCron.stop();
  fiveMinuteCrons.stop();
}
// handleData()
// calculateRunnerChange();
handleData();

module.exports = router;
