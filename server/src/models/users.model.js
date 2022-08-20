const { Schema, model } = require("mongoose");
const id = new ObjectID();

const UserSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      index: true,
      unique: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },

    password: {
      type: String,
      require: true,
    },

    address: {
      type: String,
      require: true,
    },

    role: {
      type: String,
      require: true,
      default: "buyer",
      enum: ["buyer", "admin"],
    },
    refreshToken: {
      type: String,
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

const UserModel = model("users", UserSchema);

module.exports = UserModel;
