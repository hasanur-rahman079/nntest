const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const url = process.env.MONGO_URI;

const connectionParams = {
  autoIndex: true,
};

const connect = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(url, connectionParams);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection failed");
    console.log(error.message);
    throw new Error(error);
  }
};

module.exports = connect;
