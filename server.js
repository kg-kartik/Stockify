const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

var port = process.env.PORT || 8000;

// CONNECTION OF DATABASE WITH MONGOOSE
mongoose.connect(
  process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  function (error) {
    if (error) throw error; // Handle failed connection
    console.log("Database connected  " + mongoose.connection.readyState);
  }
);

// ROUTES AS MIDDLEWARES
app.use("/api", require("./Routes/user"));
app.use("/stocks", require("./Routes/stocks"));

// LISTENING TO PORT
app.listen(port, (req, res) => {
  console.log(`Server has started at port ${port}`);
});
