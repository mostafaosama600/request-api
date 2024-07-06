process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
});

const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./src/database/dbConnection");
const app = express();
require("dotenv").config({ path: "./config/.env" });
const port = process.env.PORT || 4000;
const morgan = require("morgan");
const AppError = require("./src/utils/AppError");
const globalMiddlewareErr = require("./src/utils/globalMiddlewareErr");
const { allRequires } = require("./src/utils");

app.use(cors());
app.use(express.json());
if (process.env.MODE_ENV === "development") {
  app.use(morgan("dev"));
}
allRequires(app);
app.all("*", (req, res, next) => {
  next(new AppError(`can't find route: ${req.originalUrl} on server`, 404));
});

app.use(globalMiddlewareErr);

dbConnection();
app.listen(port, () => console.log(`\nExample app listening on port ${port}!`));

process.on("unhandledRejection", (err) => {
  console.log("unhandledRejection", err);
});

// done
