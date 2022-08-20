const { Schema, model } = require("mongoose");
const id = new ObjectID();

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

  { timestamps: true }
);

const OrderModel = model("buyer", OrderSchema);

module.exports = OrderModel;
