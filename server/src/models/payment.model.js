const { Schema, model } = require("mongoose");
const Id = new ObjectId();

const PaymentSchema = new Schema(
  {
    orderId: {
      type: Schema.Type.ObjectId,
      ref: "users",
      required: true,
      unique: true,
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
