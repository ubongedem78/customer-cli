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

//update Customer
const updateCustomer = async (_id, customer) => {
  const newCustomer = await Customer.updateOne({ _id }, customer);
  console.info("Customer Updated", newCustomer);
  mongoose.disconnect();
};

//delete Customer
const removeCustomer = async (_id) => {
  const deletedCustomer = await Customer.remove({ _id });
  console.info(`${deletedCustomer} has been deleted`);
  mongoose.disconnect();
};

//List Customers
const listCustomers = async () => {
  const customers = await Customer.find({});
  console.info(customers);
  console.info(`${customers.length} customers`);
  mongoose.disconnect();
};

module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  listCustomers,
  removeCustomer,
};
