const mongoose = require("mongoose");
require("dotenv").config();

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("DB connected");
  } catch (error) {
    console.log("Error in DB", error);
  }
};

module.exports = db;
