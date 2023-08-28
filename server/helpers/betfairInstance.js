const axios = require("axios");
const https = require('https')
const cron = require("node-cron");
let ssoidToken = `${process.env.BETFAIR_SESSION_TOKEN}`;

const keepAliveInstance = axios.create({
  baseURL: `${process.env.KEEP_ALIVE_BASE_URL}`,
});

keepAliveInstance.interceptors.request.use(function (config) {
  config.headers["X-Application"] = `${process.env.BETFAIR_APP_KEY}`;
  config.headers["X-Authentication"] = ssoidToken;
  config.headers.Accept = "application/json";
  return config;
});

const keepAliver = async () => {
  try {
    const keepAliveResponse = await keepAliveInstance.post("/keepAlive");
    if (keepAliveResponse.data?.token) {
      ssoidToken = keepAliveResponse.data.token;
    }
    console.log("ssoidToken", "I HAVE UPDATED");
  } catch (error) {
    console.log(error);
  }
};
// TO CHECK ONCE:
// keepAliver();

// TO SCHEDULE IT EVERY 10 Minute
// if (process.env.NODE_ENV === "development") {
//   const keepAlive = cron.schedule("*/5 * * * *", keepAliver);
//   keepAlive.start();
// }

const betfairInstance = axios.create({
  baseURL: `${process.env.BETFAIR_API_BASE_URL}`,
});
betfairInstance.interceptors.request.use(async function (config) {
  config.headers["X-Application"] = `${process.env.BETFAIR_APP_KEY}`;
  config.headers["X-Authentication"] = ssoidToken;
  config.headers.Accept = "application/json";

  return config;
});
betfairInstance.defaults.timeout = 30000;
betfairInstance.defaults.httpsAgent = new https.Agent({ keepAlive: true });

module.exports = {
  betfairInstance,
  keepAliver,
};
