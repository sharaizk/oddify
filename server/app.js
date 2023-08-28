const express = require("express");
const cors = require("cors");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const authenticateToken = require("./middlewares/authenticate");
const app = express();
app.use(express.json());

// === DB Connection ===
// === CORS Enabled ===
app.use(cors());

// === Adding Secuirty ===
// app.use(mongoSanitize());
// app.use(xss());

// ROUTES
const userRoutes = require("./routes/user.routes");
const betfairRoutes = require("./routes/betfair.routes");
const cronjob = require("./routes/cronjob.routes");
const telegramRoutes = require("./routes/telegram.routes");
const filterRoutes = require("./routes/filter.routes");
app.use("/api/auth", userRoutes);
app.use("/api/events", betfairRoutes);
app.use("/api/cronjob", cronjob);
app.use("/api/telegram", telegramRoutes);
app.use("/api/filter", filterRoutes);
module.exports = app;
