const express = require("express");
const { getUserById, createUser, getAllUsers, updateUser, deleteUser } = require("../Controllers/users.controller");
const { adminRequired, userRequired } = require("../middleware/auth.middleware");
const userRouter = express.Router();


userRouter.get("/", getUserById);
userRouter.post("/", createUser);
userRouter.get("/admin", adminRequired, getAllUsers);
userRouter.put("/", userRequired, updateUser);
userRouter.delete("/", userRequired, deleteUser)



module.exports ={
    userRouter
}