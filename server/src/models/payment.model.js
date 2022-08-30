// Importing desstructing mongoose from installed mongoose
const { Schema, model } = require("mongoose");
const Id = new ObjectId();

// ORDER SCHEMA CREATION FOR ALL ORDER MODELS
const PaymentSchema = new Schema(
  {
    orderId: {
      type: Schema.Type.ObjectId,
      ref: "orders",
      required: true,
    },

    ref: {
      type: String, ///JP-ORDER-20221706S14
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      required: true,
      default: "unpaid",
      enum: ["unpaid", "paid"],
    },
  },

  // TIME STAMP WOULD BE RESPONSIBLE TO CREATE & UPDATE  DATE & TIME A PAYMENT ORDER

  // MADE  IN THE DATABASE
  { timestamps: true }
);

// ASSIGNING SCHEMA ORDER MODELS TO 1 CONSTANT
const PaymentModel = model("payment", PaymentSchema);

// EXPORTING THE THE MODELS
module.exports = PaymentModel;
