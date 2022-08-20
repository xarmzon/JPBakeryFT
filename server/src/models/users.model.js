const { Schema, model } = require("mongoose");
const id = new ObjectID();

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
      default: "buyer",
      enum: ["buyer", "admin"],
    },
    refreshToken: {
      type: String,
    },
  },

  { timestamps: true }
);

const UserModel = model("users", UserSchema);

module.exports = UserModel;
