const mongoose = require("mongoose");
const Customer = require("./models/customer");
require("dotenv").config();

const connectDB = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const addCustomer = async (customer) => {
  try {
    if (
      !customer.firstname ||
      !customer.lastname ||
      !customer.phone ||
      !customer.email
    ) {
      throw new Error(
        "Customer not added. Please provide all required fields."
      );
    }
    const newCustomer = await Customer.create(customer);
    console.info("New Customer Added...", newCustomer);
  } catch (error) {
    if (error.code && error.code === 11000) {
      console.log(
        `Duplicate value entered for ${Object.keys(
          error.keyValue
        )}, please choose another value`
      );
    } else console.log("Error adding customer", error);
  }
  mongoose.connection.close();
};

const findCustomer = async (name) => {
  try {
    //make case insensitive
    const search = new RegExp(name, "i");
    if (!search) {
      throw new Error("Please enter First or Last name");
    }
    const customers = await Customer.find({
      $or: [{ firstname: search }, { lastname: search }],
    });
    console.info(customers);
    console.info(`${customers.length} matches`);
    //search in first name or last name & return matches
  } catch (error) {
    console.error("Error finding customer:", error);
  }
  mongoose.connection.close();
};

//update Customer
const updateCustomer = async (_id, customer) => {
  const newCustomer = await Customer.findOneAndUpdate({ _id }, customer);
  if (!newCustomer) {
    throw new Error("Failed to update");
  }
  console.info("Customer Updated");
  mongoose.connection.close();
};

//delete Customer
const removeCustomer = async (_id) => {
  const deletedCustomer = await Customer.findByIdAndRemove({ _id });
  console.info(`${deletedCustomer} has been deleted`);
  mongoose.connection.close();
};

//List Customers
const listCustomers = async () => {
  const customers = await Customer.find({});
  console.info(customers);
  if (!customers) {
    throw new Error("No Customers have been registered");
  }
  console.info(`${customers.length} customers`);
  mongoose.connection.close();
};

module.exports = {
  addCustomer,
  findCustomer,
  updateCustomer,
  listCustomers,
  removeCustomer,
};
