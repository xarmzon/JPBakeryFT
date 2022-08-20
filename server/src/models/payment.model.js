const { Schema, model } = require("mongoose");
const Id = new ObjectId();

const PaymentSchema = new Schema(
  {
    orderId: {
      type: Schema.Type.ObjectId,
      unique: true,
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

  { timestamps: true }
);

const PaymentModel = model("buyers", PaymentSchema);

module.exports = PaymentModel;
