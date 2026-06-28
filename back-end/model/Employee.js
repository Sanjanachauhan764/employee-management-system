const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    id :{
        type : Number,
        required : true,
    },
    name :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
    },
    department :{
        type : String,
        required : true,
    }
})
module.exports = mongoose.model("Employee",EmployeeSchema);