const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (err) {
    console.log(`Error Connecting to DB: ${err.message}`);
    process.exit(-1);
  }
};
