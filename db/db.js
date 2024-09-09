const mongoose = require("mongoose");
const URL = process.env.DB_LINK;
const connectDb = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

module.exports = connectDb;
