const express = require('express');
const { createOrder, getOrderById, updateOrder, deleteOrder, updateOrderStatus } = require('../controller/order.controller');
const orderRouter = express.Router();


orderRouter.post('/', createOrder)
orderRouter.get("/", getOrderById)
orderRouter.put("/", updateOrder)
orderRouter.delete("/", deleteOrder)
orderRouter.put("/orderstatus", updateOrderStatus);

module.exports = {
    orderRouter
}