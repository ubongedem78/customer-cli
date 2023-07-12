const connectDB = require("../db/connect");
const Customer = require("../models/customer");

const addCustomer = (customer) => {
  Customer.create(customer).then((customer) => {
    console.info("New Customer Added...");
    connectDB.close();
  });
};

const findCustomer = (name) => {
  //make case insensitive
  const search = new RegExp(anme, "i");
  Customer.find({ $or: [{ firstname: search }, { lastname: search }] }).then(
    (customer) => {
      console.info(customer);
      console.info(`${customer.length} matches`);
    }
  ); //search in first name or last name & return matches
};

module.exports = {
  addCustomer,
  findCustomer,
};
