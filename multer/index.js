const express = require('express');
const app = express();
const multer = require('multer');
const mongoose = require('mongoose');
const imageModel = require('./image');
var fs = require('fs');
var path = require('path');
const PORT = 5000;



mongoose.connect("mongodb://localhost:27017/image",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(console.log(`DB GOT CONNECTED`))
.catch((error)=>{
    console.log(`DB CONNECTION ISSUES`);
    console.log(error);
    process.exit(1)
});
const fileStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'./images');
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now()+ '--' + file.originalname);
    },
});

// const upload = multer({storage : fileStorage}).single('image');
const upload = multer({storage : fileStorage})


app.get('/ready',(req,res)=>{
    res.send('You ready to upload files')
})

// app.post('/upload',(req,res)=>{
//      upload(req,res,(err)=>{
//         if(err)
//             console.log(err);
//         else{
//             const newImage =  imageModel.create({
//                 name : req.body.name,
//                 image: {
//                     data : req.file.filename,
//                     contentType: 'image/png',
//                 },
//             }).then(()=>res.send('successfully upload'))
//              .catch((err)=>res.send(err));
//         }    
//      })
// });
app.post('/upload', upload.single('image'), (req, res, next) => {

	var obj = {
		name: req.body.name,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename)),
			contentType: 'image/png'
		}

	}
	imageModel.create(obj, (err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
			res.send(obj);

            // converting buffer into images
            // fs.writeFileSync('images/gaurav.jpg',obj.img.data);
		}
	});
});

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})