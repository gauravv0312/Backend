require("dotenv").config();
require('./config/database').connect()
const express = require('express')
const bcrypt = require('bcryptjs');
const User = require('./model/user')
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("<h1>Hello From AuthSystem</h1>")
});

app.post('/register',async(req,res)=>{
     
    try {
        const {firstname,lastname,email,password} = req.body;

    if(!(firstname && lastname && email && password))
    {
        res.status(400).send("All field are required");
    }

    const existingUser =await User.findOne({email});

    if(existingUser){
        res.status(401).send('User already exists')
    }
    
    const myEncPassword = await bcrypt.hash(password,10)
    const user= await User.create({
        firstname,
        lastname,
        email:email.toLowerCase(),
        password : myEncPassword ,
    });
    // token creation
    const token = jwt.sign(
        {user_id : user._id,email},
        process.env.SECRET_KEY,
        {
            expiresIn : "2h"
        }
    );
    user.token = token;

    // handle password situation 
     user.password = undefined;

    res.status(201).json(user);
}
catch (error) {
       console.log(error); 
    }

    });

module.exports = app;
 