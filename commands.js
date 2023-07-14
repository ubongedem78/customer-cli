#!/usr/bin/env node
const { program } = require("commander");
const inquirer = require("inquirer");

const {
  addCustomer,
  findCustomer,
  updateCustomer,
  listCustomers,
  removeCustomer,
} = require("./index");
const customer = require("./models/customer");

//customer questions
const questions = [
  {
    type: "input",
    name: "firstname",
    message: "Customer First Name",
    validate: (input) => {
      if (!input) {
        return "Please enter the first name.";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "lastname",
    message: "Customer Last Name",
    validate: (input) => {
      if (!input) {
        return "Please enter the last name.";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "phone",
    message: "Customer Phone Number",
    validate: (input) => {
      if (!input) {
        return "Please provide phone number.";
      }
      return true;
    },
  },
  {
    type: "input",
    name: "email",
    message: "Customer Email Address",
    validate: (input) => {
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!emailRegex.test(input)) {
        return "Please enter a valid email address.";
      }
      return true;
    },
  },
];

program.version("1.0.0").alias("v").description("Client Management System");

//Add Customer
program
  .command("add")
  .alias("a")
  .description("Add a Customer")
  .action(async () => {
    const answers = await inquirer.prompt(questions);
    addCustomer(answers);
  });

//Find Customer
program
  .command("find <name>")
  .alias("f")
  .description("Find a customer")
  .action((name) => findCustomer(name));

//Update Customer
program
  .command("update <_id>")
  .alias("u")
  .description("Update Customer")
  .action(async (_id) => {
    const answers = await inquirer.prompt(questions);
    updateCustomer(_id, answers);
  });

//Remove customer
program
  .command("remove <_id>")
  .alias("r")
  .description("Remove a customer")
  .action((_id) => removeCustomer(_id));

//List all customers
program
  .command("list")
  .alias("l")
  .description("List  all customers")
  .action(() => listCustomers());

program.parse(process.argv);
