const mongoose  = require('mongoose');
const itemSchema = new mongoose.Schema({
    itemName:{
        type:String,
        require:true,
    }
},{ versionKey: false });

module.exports = mongoose.model('items',itemSchema);