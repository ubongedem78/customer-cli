const connectDB = require("../db/connect");
const Customer = require("../models/customer");

const addCustomer = async (customer) => {
  try {
    const newCustomer = await Customer.create(customer);
    console.info("New Customer Added...", newCustomer);
    mongoose.disconnect();
  } catch (error) {
    console.log("Error adding customer", error);
  }
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
};

module.exports = {
  addCustomer,
  findCustomer,
};
