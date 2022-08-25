const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { config } = require("./config");
const { orderRouter } = require("./routes/order.routes.");
const { userRouter } = require("./routes/user.routes");
const { notFound, errorHandler } = require("./middleware/error");

const app = express();
app.use(express.json());

app.use(morgan("dev"));
app.use(cors());
app.use("/order", orderRouter)
app.use("/users", userRouter)
app.use("*", notFound)
app.use(errorHandler)


app.use("/api", (req, res) => {
  res.send({
    msg: `Yah.....Welcome to ${config.APP_NAME} API ✔🎈🎉✨ Created by Techathon Node.JS Track Mentees`,
  });
});

module.exports = app;
