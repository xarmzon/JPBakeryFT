const express = require("express");
const authRouter = express.Router();
const {
  register,
  login,
  logout,
  refreshToken,
} = require("../Controllers/auth.controller");
const { userRequired } = require("../middleware/auth.middleware");

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", userRequired, logout);
authRouter.post("/refreshToken", userRequired, refreshToken);

module.exports = authRouter;
