const { program } = require("commander");
const { prompt } = require("inquirer");
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
  },
  {
    type: "input",
    name: "lastname",
    message: "Customer Last Name",
  },
  {
    type: "input",
    name: "phone",
    message: "Customer Phone Number",
  },
  {
    type: "input",
    name: "email",
    message: "Customer Email Address",
  },
];

program.version("1.0.0").description("Client Management System");

// program
//   .command("add <firstname> <lastname> <phone> <email>")
//   .alias("a")
//   .description("Add a customer")
//   .action((firstname, lastname, phone, email) => {
//     addCustomer({ firstname, lastname, phone, email });
//   });

//Add Command
program
  .command("add")
  .alias("a")
  .description("Add a Customer")
  .action(async () => {
    const answers = await prompt(questions);
    addCustomer(answers);
  });

//Find Command
program
  .command("find <name>")
  .alias("f")
  .description("Find a customer")
  .action((name) => findCustomer(name));

//Update Command
program
  .command("update <_id>")
  .alias("u")
  .description("Update Customer")
  .action(async (_id) => {
    const answers = await prompt(questions);
    updateCustomer(_id, answers);
  });

//jknskd
program.parse(process.argv);
