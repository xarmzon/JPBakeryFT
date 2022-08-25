const express = require('express');
const { createUser, getUserById, deleteUser, updateUser } = require('../controller/user.controller');
const userRouter = express.Router();

userRouter.post("/", createUser)
userRouter.get("/", getUserById)
userRouter.delete("/", deleteUser);
userRouter.put("/", updateUser)





module.exports ={
    userRouter
}