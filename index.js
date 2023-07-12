const connectDB = require("./db/connect");
const Customer = require("./models/customer");


const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on port: ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
