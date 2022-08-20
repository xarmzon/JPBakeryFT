// Importing desstructing mongoose from installed mongoose

const { Schema, model } = require("mongoose");
const id = new ObjectID();

// ORDER SCHEMA CREATION FOR ALL ORDER MODELS
const OrderSchema = new Schema(
  {
    cakename: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },

    cakeColor: {
      type: String,
      required: true,
    },

    cakeSize: {
      type: String,
      required: true,
      enums: ["small", "medium", "large"],
    },

    deliveryDate: {
      type: Date,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "account",
      required: true,
    },

    qty: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      required: true,
      default: "buyer",
      enum: ["pending", "approved", "rejected", "delivered"],
    },
  },

  // TIME STAMP WOULD BE RESPONSIBLE TO CREATE & UPDATE  DATE & TIME FOR ORDERS

  // MADE  IN THE DATABASE

  { timestamps: true }
);

// ASSIGNING SCHEMA ORDER MODELS TO 1 CONSTANT
const OrderModel = model("buyer", OrderSchema);

// EXPORTING THE THE MODELS
module.exports = OrderModel;
