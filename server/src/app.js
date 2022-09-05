require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { config } = require("./config");
const cookieParser = require("cookie-parser");
const router = require("./routes");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.use(router);
app.use("/api", (req, res) => {
  res.send({
    msg: `Yah.....Welcome to ${config.APP_NAME} API ✔🎈🎉✨ Created by Techathon Node.JS Track Mentees`,
  });
});

module.exports = app;
