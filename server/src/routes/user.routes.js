const express = require("express");
const { getUserById, createUser, getAllUsers, updateUser, deleteUser } = require("../Controllers/users.controller");
const userRouter = express.Router();


userRouter.get("/", getUserById);
userRouter.post("/", createUser);
userRouter.get("/admin", getAllUsers);
userRouter.put("/", updateUser);
userRouter.delete("/", deleteUser)



module.exports ={
    userRouter
}