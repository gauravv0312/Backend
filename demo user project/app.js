require('dotenv').config();
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
app.use(express.json());
const route = require('./route')
const commonFunction = require('./common/common_function')

app.get("/api/common", (req, res) => {
   res.status(200).send("common ready to start");
 });

// mongoose.connect('mongodb://localhost:27017/demoDB', (err) =>{
//    if(err) console.log(err)
//    else console.log('Database Connected')
// })

commonFunction.connectDatabase()

app.use('/', route)
app.listen(process.env.PORT,(err)=>{
   if(err) console.log(`Server connection issue: ${err}`)
   else console.log(`Server connected on ${process.env.PORT}`);
})

module.exports = app