require("dotenv").config();
require('./config/database').connect()
const express = require('express')
const User = require('./model/User')
const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("<h1>Hello From AuthSystem</h1>")
});

app.post('/register',async(req,res)=>{
    const {firstname,lastname,email,password} = req.body;

    if(!(firstname && lastname && email && password))
    {
        res.status(400).send("All field are required");
    }

    const existingUser =await User.findOne({email});

    if(existingUser){
        res.status(400).send('User already exists')
    }
})
module.exports = app;
 