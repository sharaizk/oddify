const mongoose = require("mongoose");
let cachedConnection = null;
exports.connect = () => {
  if (cachedConnection) {
    return Promise.resolve();
  }
  cachedConnection = mongoose
    .connect(process.env.DatabaseURL, {
      serverSelectionTimeoutMS: 20000,
    })
    .then((db) => {
      // cachedConnection
      cachedConnection = db.connections[0].readyState;
      console.log("Database Access Granted");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
