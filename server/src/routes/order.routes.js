const express = require("express");
const { createOrder, getAllOrder, updateOrder, updateOrderStatus, getOrderById, deleteOrder } = require("../Controllers/order.controller");
const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.get("/admin", getAllOrder);
orderRouter.get("/", getOrderById)
orderRouter.delete("/", deleteOrder)
orderRouter.put("/", updateOrder),
orderRouter.put("/status", updateOrderStatus);




module.exports ={
    orderRouter
}