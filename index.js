const mongoose = require("mongoose");
const Customer = require("./models/customer");
require("dotenv").config();

const connectDB = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const addCustomer = async (customer) => {
  try {
    const newCustomer = await Customer.create(customer);
    console.info("New Customer Added...", newCustomer);
  } catch (error) {
    console.log("Error adding customer", error);
  }
  mongoose.disconnect();
};

const findCustomer = async (name) => {
  try {
    //make case insensitive
    const search = new RegExp(name, "i");
    const customers = await Customer.find({
      $or: [{ firstname: search }, { lastname: search }],
    });
    console.info(customers);
    console.info(`${customers.length} matches`); //search in first name or last name & return matches
  } catch (error) {
    console.error("Error finding customer:", error);
  }
  mongoose.disconnect();
};

module.exports = {
  addCustomer,
  findCustomer,
};
