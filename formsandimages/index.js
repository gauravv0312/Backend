const express = require('express');
const app = express();
const fileupload = require('express-fileupload')
const cloudinary = require('cloudinary').v2;
app.set('view engine','ejs')

cloudinary.config(
    {
        cloud_name : "de7aicxuf",
        api_key: "981953595491838",
        api_secret: "RyBoJvGrdLN7QbV6aUpCPWfORjA"
    }
)
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/", 
}
    
));

app.get('/myget',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
})

app.post('/mypost',async(req,res)=>{
    console.log(req.files)
    console.log(req.body);

    let result;
    let imageArray=[];
    // ------------------------for single images---------------------//
    // let files = req.files.samplefile;
    // result =await cloudinary.uploader.upload(files.tempFilePath,{
    //     folder:'users'
    // });
    // console.log(result);
    // details = {
    //     firstname : req.body.firstname,
    //     lastname : req.body.lastname,
    //     result,
    // }
    // res.send(details);

//  ---------------------------for multiple images-------------------//

if (req.files) {
    for (let index = 0; index < req.files.samplefile.length; index++) {
      let result = await cloudinary.uploader.upload(
        req.files.samplefile[index].tempFilePath,
        {
          folder: "users"
        }
      );

      imageArray.push({
        public_id: result.public_id,
        secure_url: result.secure_url
      });
    }
  }

  console.log(result);

  let details = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    result,
    imageArray
  };
  console.log(details);

  res.send(details);


//  //////////////////////////

    
})


app.get('/getform',(req,res)=>{
     res.render('getform')
})

app.get('/postform',(req,res)=>{
      res.render("postform")
})

app.listen(4000,()=>[
    console.log('Server is running on port 4000')
])