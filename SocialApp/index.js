const express  =require('express');

const app = express();

const PORT = 4000 || process.env.PORT;

app.get('/',(req,res)=>{
      res.status(200).send('<H1>Hello Zibtek</H1>') 
});

app.get('/api/v1/instagram',(req,res)=>{
    const instagram = {
        username : 'gauravv0312',
        follower : 100,
        follow : 50,
        date : new Date().toLocaleString()
    };
    res.status(200).json(instagram);
});

app.get('/api/v1/facebook',(req,res)=>{
    const facebook = {
        username : 'gauravverma',
        follower : 100,
        follow : 50,
        date : new Date().toLocaleString()
    };
    res.status(200).json(facebook);
});

app.get('/api/v1/linkedin',(req,res)=>{
    const linkedin = {
        username : 'gauravv0312@gmail.com',
        follower : 1000,
        follow : 500,
        date : new Date().toLocaleString()
    };
    res.status(200).json(linkedin);
});

app.get('/api/v1/:token',(req,res)=>{
    console.log(req.params.token);
    res.status(200).json({param : req.params.token});

});


  

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
});