const express = require("express");
const orderRouter = require("./order.routes");
const userRouter = require("./user.routes");
const authRouter = require("./auth.route");
const router = express.Router();

// router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/auth", authRouter);

module.exports = router;
