const OrderModel = require("../models/order.model");
const crypto = require('crypto')
const priceCalc = require("../services/price.services");
const { CustomError } = require("../middleware/customError");
const asyncHandler = require('express-async-wrapper');
const UserModel = require("../models/users.model");

const createOrder =  asyncHandler( async(req, res, next) => {
        const ref = crypto.randomBytes(8).toString('hex')
    try {
        const {
            cakeName,
            cakeColor,
            cakeSize,
            qty,
            userId,
        } = req.body;


        if(!(cakeColor || cakeName || cakeSize || qty)){
            return next(CustomError.badRequest("Please Supply cake details"))
        }

        if(!cakeName){
            return next(CustomError.badRequest("Please Supply cake name"))
        }

        if(!cakeColor){
            return next(CustomError.badRequest("Please Supply cake color"))
        }

        if(!cakeSize){
            return next(CustomError.badRequest("Please Supply cake size"))
        }

        if(!qty){
           return next(CustomError.badRequest("Please Supply cake quantity"))
        }

        if(!userId){
            return next(CustomError.badRequest("Please Supply the your user ID"))
         }

        size = cakeSize;
        quantity = qty;
        let price = priceCalc(size, quantity);
        let status = "pending";
        let deliveryDate = new Date(Date.now());
        deliveryDate.setDate(deliveryDate.getDate() + 1);
        
        const order = await OrderModel.create({
            cakeName,
            cakeColor,
            cakeSize,
            qty,
            deliveryDate,
            price,
            status,
            userId

        })

        res.status(200).json({msg: order, "payment Id":ref})
    } catch (error) {

       next(CustomError.customError("An Error occured"))
    }
})


const getOrderById = async(req, res, next) => {
   const {id, userId} = req.query;
  try {
     if(!id){

    return  next(CustomError.badRequest("Please supply order ID as paramter"))
     } 
      if(!userId){
          return next(CustomError.badRequest("Please supply your user ID "))
      }

      
     const order = await OrderModel.findById({_id: id}) 
    
     if(!order){
      return next(CustomError.notFound("Order with supplied ID does not exist"))
     }
  
     res.status(200).json({'Required Order': order})
  } catch (error) {
    next(error)
  }
}

const updateOrder = async(req, res, next) => {

    const {id, qty} = req.body;
    const order = req.body;

    //Check if buyer supplied an ID
    if(!id){
      return  res.status(400).json({msg: "Please Supply order ID to be updated"})
    }

   try {

    //look for supplied ID in the database
    const orderToUpdate = await OrderModel.findById(id)
    if(!orderToUpdate){
        return res.status(404).json({Error: "Order with given ID not found"})
    }
     const updatedOrder = await  OrderModel.findByIdAndUpdate(id, order)
     size = updatedOrder.cakeSize;
     quantity = updatedOrder.qty;
    updatedOrder.price = priceCalc(size, quantity);
     
     const newOrder= await updatedOrder.save();
     res.status(201).json({msg: newOrder})
   } catch (error) {
    res.status(500).json({Error: error.message})
   }
}

const deleteOrder = async(req, res, next) =>{
    const {id} = req.query;
    if(!id){
        return res.status(400).json({Error: "Please supply order ID as parameter"})
    } 
    
    
    try {
        const orderToBeDeleted = await OrderModel.findById(id)
        if(!orderToBeDeleted){
            res.status(404).json({Error: "Order with supplied ID does not exist"})
        } else {
            await OrderModel.findByIdAndDelete(id);
            res.status(200).json({msg: "Order deleted successfully"})
        }
    } catch (error) {
        next(error)
    }

}

const updateOrderStatus = async(req, res, next)=>{
    const {id, userId, status} = req.body;
    if(!id){
        return next(CustomError.badRequest("Please supply your order ID to be approved"))
    }

    if(!userId){
        return next(CustomError.badRequest("Please supply your user ID"))
    }
    try {
    const user = await UserModel.findById(userId)
    if(!user){
        return next(CustomError.notFound(`User with ID: ${userId} does not exist`))
    }

    if(user.role!=="admin"){
        return next(CustomError.unauthorized("Only an admin can approve order"))
    }

     const orderToBeUpdated = await OrderModel.findById(id);

     if(!orderToBeUpdated){
        return next(CustomError.notFound(`order with ID: ${id} does not exist`))  
     }
     orderToBeUpdated.status = status;
     orderToBeUpdated.save();
     res.status(201).json({msg: `Order with id: ${id} has been approved`, orderToBeUpdated})      
   } catch (error) {
    next(error)
   }
}


module.exports = {
    createOrder,
    getOrderById,
    updateOrder,
    deleteOrder,
    updateOrderStatus
}