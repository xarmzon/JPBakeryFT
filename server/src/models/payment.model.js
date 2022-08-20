const { Schema, model } = require("mongoose");
const id = new ObjectID();

const PaymentSchema = new Schema(
  {
    orderId: {
      type: Schema.Type.order(_id),
      unique: true,
    },

    ref: {
      type: String,
    },

    amount: {
      type: Number,
      require: true,
    },

    status: {
      type: String,
      require: true,
      default: "buyer",
      enum: ["unpaid", "paid"],
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

const PaymentModel = model("buyers", PaymentSchema);

module.exports = PaymentModel;
