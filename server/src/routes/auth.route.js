const express = require('express');
const authRouter = express.Router();
const {register, login, logout, refreshToken} = require("../Controllers/auth.controller")

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/refreshToken", refreshToken);



module.exports = authRouter;