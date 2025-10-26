const mongoose = require("mongoose");
const colors = require("colors");

// function mongodb database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connecting to Database ${mongoose.connection.host}`.bgBlue.cyan.bold
    );
  } catch (error) {
    console.log("DB error", error, colors.red.bold);
  }
};

module.exports = connectDB;
