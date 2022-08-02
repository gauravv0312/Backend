require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const User = require('./model/user')
const auth = require('./middleware/auth')
app.get('/',(req,res)=>{
    res.send("<h1>Hello From Gaurav Side</h1>")
});

app.post('/register',async(req,res)=>{
try {
    const {firstname,lastname,email,password} = req.body;

    if(!(firstname && lastname && email && password))
    {
       res.status(400).send('All Field are required');
    }
   
   const existingUser =await User.findOne({email});

   if(existingUser){
       res.status(401).send('User already exists');
   }

   const myEncPassword = await bcrypt.hash(password,10);

   const user  =await User.create({
       firstname,
       lastname,
       email : email.toLowerCase(),
       password : myEncPassword
   });

   // token

   const token = jwt.sign(
       {user_id: user._id,email},
       process.env.SECRET_KEY,
       {
           expiresIn: '2h'
       }
   );
   user.token = token;
//  update or not

 res.status(201).json(user)
} catch (error) {
    console.log(error);
}

});


app.post('/login',async(req,res)=>{

    try {

        const {email,password} = req.body
        if(!(email && password))
        {
            res.status(400).send('field is missing')
        }
        const user = await User.findOne({email})

        if(user && (await bcrypt.compare(password,user.password)))
        {
            const token = jwt.sign(
                {user_id : user._id,email},
                process.env.SECRET_KEY,
                {
                    expiresIn : '2h'
                }
            )
            user.token = token
            // res.status(200).json(user);
   
            // use of cookies 

            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,   // to read the cookies from only backend
            };

            res.status(200).cookie("token",token,options).json(
                {
                    success : true,
                    token,
                    user,
                }
            );
            
        }
        res.status(400).send('email or password is incorrect')
        
    } catch (error) {
        console.log(error);
    }

});

app.get('/dashboard',auth,(req,res)=>{
    res.send("Welcome to secret information")
});

module.exports = app