const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Employee = require("./model/Employee");
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://sanjana:12345@cluster0.r4uolfu.mongodb.net/Employee?appName=Cluster0")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err))

//let employees = [];

app.get("/employees",async(req,res) => {
    const employees = await Employee.find();
    res.json(employees);
})

app.post("/employees",async(req,res) => {
const employee = new Employee ({
    id : req.body.id,
    name : req.body.name,
    email : req.body.email,
    department : req.body.department
})
   await employee.save();
   res.json({
      message:"Employee Added"
   });
})

app.put("/employees/:id", async(req, res) => {
    const employee = await Employee.findByIdAndUpdate(req.params.id,
            {id : req.body.id},
            {name : req.body.name},
            {email : req.body.email},
            {department : req.body.department},
            {new : true},
    )
    res.json({
        message : "Employee Updated",
        data : employee
    })
});

app.delete("/employees/:id",async(req,res) => {
    await Employee.findByIdAndDelete(req.params.id)
    res.json({
        message : "User Deleted"
    })
})

app.listen(5000,() => {
    console.log("Server Running on Port 5000");
})