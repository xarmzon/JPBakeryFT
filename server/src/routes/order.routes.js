const express = require("express");
const { createOrder, getAllOrder, updateOrder, updateOrderStatus, getOrderById, deleteOrder } = require("../Controllers/order.controller");
const { adminRequired, userRequired } = require("../middleware/auth.middleware");
const orderRouter = express.Router();

orderRouter.post("/", userRequired, createOrder);
orderRouter.get("/admin", userRequired, adminRequired, getAllOrder);
orderRouter.get("/", userRequired, getOrderById)
orderRouter.delete("/", userRequired, deleteOrder)
orderRouter.put("/", userRequired, updateOrder),
orderRouter.put("/status", userRequired, adminRequired, updateOrderStatus);

module.exports ={
    orderRouter
}