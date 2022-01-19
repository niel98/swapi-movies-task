const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const colors = require("colors");

const app = express();
global.sendError = createError;
global.__basedir = __dirname + "/";

// Log requests to the console.
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const db = require("./app/models");
const errorHandler = require("./app/middleware/error");
//db.sequelize.sync({force:true})

//routes
require("./app/routes/index.routes")(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to SWAPI api." });
});

app.use(function (req, res, next) {
  next(sendError(404, "Route unavailable"));
});

app.use(errorHandler);

const PORT = process.env.PORT || 6000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`.cyan.underline);
});

//module.exports = app;
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err}`.red);
  //Close server & exit process
  // server.close(() => process.exit(0));
  process.exit(0);
});
