const mongoose = require("mongoose");
const schema = mongoose.Schema;

const stockSchema = new schema({
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
    },
    ownedBy : {
        type : schema.Types.ObjectId,
        ref : "user"
    }
})

module.exports = mongoose.model("Stocks", stockSchema);