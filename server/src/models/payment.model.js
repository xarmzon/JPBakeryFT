// Importing desstructing mongoose from installed mongoose
const { Schema, model } = require("mongoose");
const Id = new ObjectId();

// ORDER SCHEMA CREATION FOR ALL ORDER MODELS
const PaymentSchema = new Schema(
  {
    orderId: {
      type: Schema.Type.ObjectId,
      ref: "users",
      required: true,
    },

    ref: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      required: true,
      default: "buyer",
      enum: ["unpaid", "paid"],
    },
  },

  // TIME STAMP WOULD BE RESPONSIBLE TO CREATE & UPDATE  DATE & TIME A PAYMENT ORDER

  // MADE  IN THE DATABASE
  { timestamps: true }
);

// ASSIGNING SCHEMA ORDER MODELS TO 1 CONSTANT
const PaymentModel = model("buyers", PaymentSchema);

// EXPORTING THE THE MODELS
module.exports = PaymentModel;
