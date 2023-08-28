const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const http = require("http");
const app = require("./app");
const database = require("./config/database");

// === Connecting the DB ===
database.connect();
const PORT = 3000;
const HOST = "0.0.0.0";

app.set("port", PORT);
app.set("host", HOST);

const server = http.createServer(app);
server.on("listening", () => {
  console.log("✓", `Listening on Port ${PORT}`);
});

server.listen(PORT, HOST);
