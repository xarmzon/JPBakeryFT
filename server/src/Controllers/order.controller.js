const OrderModel = require("../models/order.model");
const PaymentModel = require("../models/payment.model");
const UserModel = require("../models/users.model");
const { priceCalc } = require("../services/priceCalculator.service");
const { APIError } = require("../Utils/apiError");

const createOrder = async(req, res, next) =>{
    let {
        cakeName,
        cakeColor,
        cakeSize,
        userId,
        qty  
    } = req.body;

    if(!cakeName){
        return next(APIError.badRequest("Please supply cake name"))
    }

    if(!cakeColor){
        return next(APIError.badRequest("Please supply cake color"))
    }

    if(!cakeSize){
        return next(APIError.badRequest("Please supply cake size"))
    }

    if(!qty){
        return next(APIError.badRequest("Please supply cake quantity"))
    }

    if(!userId){
        return next(APIError.badRequest("Please supply user ID"))
    }

    let price = priceCalc(cakeSize, qty);
    let status = "pending";

    try {
        const order = await OrderModel.create({
            cakeName,
            cakeColor,
            cakeSize,
            qty,
            userId,
            price,
            status
        })

        const ref = `JP-ORDER-${new Date().toISOString()}`
        await PaymentModel.create({orderId: order._id, ref, amount: price, status: "unpaid"})
        res.status(201).json({msg: "Order created successfully", order, ref})
    } catch (error) {
        next(error)
    }


}

const getAllOrder = async(req, res, next) =>{

    const {userId} = req.query;
    if(!userId){
        return next(APIError.badRequest("Please supply your user ID"))
    }

    try {
        
        const user = await UserModel.findById(userId);
        if(!user){
            return next(APIError.notFound("user with the supplied ID does not exist"))
        }

        if(user.role !== "admin"){
            return next(APIError.unauthorized("Only admin can access this route"))
        }

        const order = await OrderModel.find()
        res.status(201).json({msg: "Order fetched successfully", order})
    } catch (error) {
        next(error)
    }
}

const getOrderById = async(req, res, next) =>{

    const {id, userId} = req.query;
    if(!userId && !id){
        return next(APIError.badRequest("Please supply your order ID and user ID"))
    }

    if(!userId){
        return next(APIError.badRequest("Please supply your user ID"))
    }

    if(!id){
        return next(APIError.badRequest("Please supply your order ID"))
    }

    try {
        user = await UserModel.findById(userId);
        if(!user){
            return next(APIError.notFound("user with the supplied ID does not exist"))
        }

        order = await OrderModel.findById(id);
        if(!order){
            return next(APIError.notFound("order with the supplied ID does not exist"))
        }

        res.status(201).json({msg: "Order fetched successfully", order})
    } catch (error) {
        next(error)
    }
    
    
}

const updateOrder = async(req, res, next) =>{
    const {id, userId} = req.body;
    if(!id){
        return next(APIError.badRequest("Please supply your order ID"))
    }

    if(!userId){
        return next(APIError.badRequest("Please supply your user ID"))
    }

    try {
        user = await UserModel.findById(userId);
        if(!user){
            return next(APIError.notFound("user with the supplied ID does not exist"))
        }

       let order = await OrderModel.findById(id);
        if(!order){
            return next(APIError.notFound("order with the supplied ID does not exist"))
        }

        order = await OrderModel.findByIdAndUpdate(id, req.body);
        res.status(201).json({msg: "Order updated successfully", order})

    } catch (error) {
        next(error)
    }

    
}

const deleteOrder = async(req, res, next) =>{
    const {id, userId} = req.query;
    if(!id){
        return next(APIError.badRequest("Please supply your order ID"))
    }

    if(!userId){
        return next(APIError.badRequest("Please supply your user ID"))
    }

    try {
        user = await UserModel.findById(userId);
        if(!user){
            return next(APIError.notFound("user with the supplied ID does not exist"))
        }

       let order = await OrderModel.findById(id);
        if(!order){
            return next(APIError.notFound("order with the supplied ID does not exist"))
        }

        await OrderModel.findByIdAndDelete(id)
        res.status(201).json({msg: `Order with id: ${id} has been deleted`})
    } catch (error) {
        next(error)
    }
}

const updateOrderStatus = async(req, res, next) =>{
    
    const {id, userId, status} = req.body;
    if(!id){
        return next(APIError.badRequest("Please supply your order ID"))
    }

    if(!userId){
        return next(APIError.badRequest("Please supply your user ID"))
    }

    if(!status){
        return next(APIError.badRequest("Please supply the order status"))
    }

    try {
        user = await UserModel.findById(userId);
        if(!user){
            return next(APIError.notFound("user with the supplied ID does not exist"))
        }

        if(user.role !=="admin"){
            return next(APIError.unauthorized("Only admin can access this route"))
        }

       let order = await OrderModel.findById(id);
        if(!order){
            return next(APIError.notFound("order with the supplied ID does not exist"))
        }

       order.status = status;
       await order.save();
        res.status(201).json({msg: `The status of Order with id: ${id} has been updated`, order})
    } catch (error) {
        next(error)
    }
}


module.exports ={
    createOrder,
    getAllOrder,
    getOrderById,
    updateOrder,
    updateOrderStatus,
    deleteOrder
}
