const express = require('express');
const app = express();
const multer = require('multer');
const mongoose = require('mongoose');
const imageModel = require('./image');
var fs = require('fs');
var path = require('path');
const PORT = 5000;
const {
    ObjectId
  } = require('mongoose').Types


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
// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

// app.post('/oldupload',upload.single('image'),async(req,res,next)=>{
	
// 	const obj =await imageModel.create({
// 		name: req.body.name,
// 		image:{
// 			data: req.file.fieldname,
// 			contentType: 'image/png',
// 		}
// 	})
// 	.catch((err)=>{res.send(err)})
// 	// const buf = Buffer.from(obj.image.data, 'base64');
// 	// fs.writeFileSync('buffer/gaurav.jpg',buf,(err, response)=>{
// 	// 	if(err)
// 	// 	console.log(err)
// 	// 	else
// 	// 	console.log("working")
// 	// })

// 	res.send(obj);
// 	console.log(obj);
// 	console.log(obj.image.data);
// 	console.log(obj._id);
// 		fs.writeFileSync(`buffer/${obj.name}.png`,obj.image.data);

// });


app.get('/getfile/:name',async(req,res)=>{
	try {
	const name = req.params.name
	const result = await imageModel.findOne({name})
    res.send(result);
	// console.log(result.image.data.data);
	} catch (error) {
		console.log(error);
	}
	
})



// ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
app.post('/upload', upload.single('image'), (req, res, next) => {

	const obj = {
		name: req.body.name,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename)),
			contentType: 'image/png'
		}

	}
	if(req.body.name)
	{
        imageModel.create(obj, (err, item) => {
			if (err) {
				console.log(err);
			}
			else {
				// item.save();
				buffer = obj.img.data;
				console.log(obj.img.data);
				res.send(req.file);
				// converting buffer into images
				// fs.writeFileSync(`buffer/${obj.name}.jpg`,obj.img.data);
			}
		});
	}
	else{
		res.send("Name field is required")
	}
	
});

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})


// app.post('/newupload', upload.single('image'), async(req, res, next) => {

// 	// const obj = {
// 	// 	name: req.body.name,
// 	// 	img: {
// 	// 		data: fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename)),
// 	// 		contentType: 'image/png'
// 	// 	}

// 	// }
// 	// imageModel.create(obj, (err, item) => {
// 	// 	if (err) {
// 	// 		console.log(err);
// 	// 	}
// 	// 	else {
// 	// 		// item.save();
// 	// 		buffer = obj.img.data;
// 	// 		console.log(obj.img.data);
//     //         imageModel.buffer = buffer;
// 	// 		res.send(obj);
// 	// 		// console.log(obj._id);
//     //         // converting buffer into images
//     //         // fs.writeFileSync(`buffer/${obj.name}.jpg`,obj.img.data);
// 	// 	}
// 	// });
// 	const result = await imageModel.create({
// 		name : req.body.name,
// 		image : {
// 			data: fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename)),
// 			contentType: 'image/png'
// 		}
// 	}); 

// 	res.send(result);
// 	console.log(result.image.data);
// });
