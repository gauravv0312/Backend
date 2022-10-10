const mongoose = require('mongoose')
 const userSchema = new mongoose.Schema({
     firstName:{
        type:String,
        default: ''
     },
     lastName:{
        type:String,
        default: ''
     },
     email:{
        type: String,
        unique: true,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     mobileNumber:{
        type:String,
        default: ''
     },
 });

 module.exports = mongoose.model('user',userSchema);