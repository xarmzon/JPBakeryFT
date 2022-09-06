require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { config } = require("./config");
const cookieParser = require("cookie-parser");
const router = require("./routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.use(router);
app.use("/api", (req, res) => {
  res.send({
    msg: `Yah.....Welcome to ${config.APP_NAME} API ✔🎈🎉✨ Created by Techathon Node.JS Track Mentees`,
  });
});

app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({
      error: true,
      msg: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "production" ? err.stack : undefined,
    });
});

module.exports = app;
