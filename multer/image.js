const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    image:{
        data:Buffer,
        contentType:String,
    }
});

module.exports = mongoose.model('images',ImageSchema);