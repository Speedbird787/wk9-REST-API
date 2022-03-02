require("dotenv").config();
const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("Connected ok")
  } catch (error) {
    console.log(error)
  }
}

connection();