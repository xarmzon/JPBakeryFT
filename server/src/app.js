const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { config } = require("./config");

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use("/api", (req, res) => {
  res.send({
    msg: `Yah.....Welcome to ${config.APP_NAME} API ✔🎈🎉✨ Created by Techathon Node.JS Track Mentees`,
  });
});

module.exports = app;
