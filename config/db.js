const mongoose = require("mongoose");

const connectDb = async () => {
  const DB_URL = process.env.MONGODB_URL;
  try {
    const connect = await mongoose.connect(DB_URL);
    console.log("Database connected successfully...");
  } catch (error) {
    console.error(error);
    process.exit();
  }
};

module.exports = connectDb;
