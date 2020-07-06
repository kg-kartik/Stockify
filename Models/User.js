const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  stockData : [
    {
      name : {
        type : String,
        required : true
      },
      quantity : {
        type : Number,
        required : true
      },
      price : {
        type : Number,
        required : true
      }
    }
  ]
});

module.exports = mongoose.model("user", userSchema);
