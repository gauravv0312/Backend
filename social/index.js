const express = require("express");
const format = require('date-format');
const app = express();
const PORT =4000 

app.get('/',(req,res)=>{
    res.status(200).send("<h1>Hello Gaurav</h1>")      
});

app.get('/api/v1/:token',(req,res)=>{
   console.log(req.params.token);
   res.status(200).json(req.params.token);
})

app.get('/api/v1/instagram',(req,res)=>{
    const insta = {
        username : "Gauravv_312",
        followers : 50,
        follow : 10,
        date : format.asString("hh:mm:ss",new Date())
    }
    res.status(200).json(insta)
});

app.get('/api/v1/facebook',(req,res)=>{
    const facebook = {
        username : "Gaurav Verma",
        followers : 500,
        follow : 100,
        date : format.asString("hh:mm:ss",new Date())
    }
    res.status(200).json(facebook)
});

app.get('/api/v1/linkedin',(req,res)=>{
    const linkedin = {
        username : "Gaurav",
        followers : 150,
        follow : 110,
        date : format.asString("hh:mm:ss",new Date())
    }
    res.status(200).json(linkedin)
});

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
});