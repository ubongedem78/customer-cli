const connectDB = require("./db/connect");
const Customer = require("./models/customer");
require("dotenv").config();



const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
  } catch (error) {
    console.log(error);
  }
};

start();
