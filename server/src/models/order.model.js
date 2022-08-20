const { Schema, model } = require("mongoose");
const id = new ObjectID();

const OrderSchema = new Schema(
  {
    cakename: {
      type: String,
      require: true,
      index: true,
      unique: true,
    },

    cakeColor: {
      type: String,
      require: true,
    },

    cakeSize: {
      type: String,
      require: true,
      enums: ["small", "medium", "large"],
    },

    deliveryDate: {
      type: Date,
      require: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "account",
      required: true,
    },

    qty: {
      type: Number,
      require: true,
    },

    price: {
      type: Number,
      require: true,
    },

    status: {
      type: String,
      require: true,
      default: "buyer",
      enum: ["pending", "approved", "rejected", "delivered"],
    },

    createdAt: {
      type: Date,
      index: true,
      unique: true,
      default: Date.now,
    },

    updateAt: {
      type: Date,
      index: true,
      unique: true,
      default: Date.now,
    },
  },

  { timestamps: true }
);

const OrderModel = model("buyer", OrderSchema);

module.exports = OrderModel;
