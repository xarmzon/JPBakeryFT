const { CustomError } = require("../middleware/customError");
const UserModel = require("../models/users.model");

const createUser = async(req, res, next) =>{
    try {
        const {
        username,
        email,
        password,
        address,
        role
     } = req.body;

     if(!(username || email || password || address || role) ){
        return next(CustomError.badRequest("Please Supply user details"))
    }

    if(!username){
        return next(CustomError.badRequest("Please Supply user name"))
    }

    if(!email){
        return next(CustomError.badRequest("Please Supply user email"))
    }

    if(!password){
        return next(CustomError.badRequest("Please Supply user password"))
    }

    if(!address){
        return next(CustomError.badRequest("Please Supply user address"))
    }

    if(!role){
        return next(CustomError.badRequest("Please Supply user role"))
    }

   
     const user = await UserModel.create({
         username,
         email,
         password,
         address,
         role
     })

     res.status(201).json({msg: "User created successfully", user})
 
   } catch (error) {
    next(error)
   }
}

const getUserById = async(req, res, next) =>{
    const {id} = req.query;
    if(!id){
        return next(CustomError.badRequest("Please supply User ID "))
    }

    try {
        const user = await UserModel.findById(id);
        if(!user){
            return next(CustomError.notFound("Account with supplied ID does not exist"))
        }

        res.status(201).json({msg: "User fetched successfully", user})
    } catch (error) {
        next(error)
    }
}

const updateUser = async(req, res, next) =>{
    const {id} = req.body;
    const body = req.body;
    if(!id){
        return next(CustomError.badRequest("Please Supply user ID to be updated"));
    }

    try {
        const userToBeUpdated = await UserModel.findById(id)
        if(!userToBeUpdated){
            return next(CustomError.notFound("The supplied user ID does not exist"))
        }

        const updatedUser = await UserModel.findByIdAndUpdate(id, body)
        res.status(201).json({msg: "user updated successfully", updatedUser})
    } catch (error) {
        next(error)
    }
}

const deleteUser = async(req, res, next) =>{
    const {id} = req.query;
    if(!id){
        return next(CustomError.badRequest("Please supply user ID to be deleted"))
    }

    try {
        const userToBeDeleted = await UserModel.findById(id)
        if(!userToBeDeleted){
            return next(CustomError.notFound("User with supplied ID does not exist"))
        }

        await UserModel.findByIdAndDelete(id);
        res.status(201).json({msg: `User with ID: ${id} deleted successfully`})
    } catch (error) {
        next(error)
    }
}


module.exports ={
    createUser,
    getUserById,
    updateUser,
    deleteUser
}