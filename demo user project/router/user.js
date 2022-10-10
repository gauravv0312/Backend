const express = require('express');
const router = express.Router();
const userController = require('../controller/user');
const userValidator = require('../validator/user')
const stringFile = require('../common/string_file.json');
const commonFunction = require('../common/common_function');
// const { isLoggedIn } = require('../validator/loggedin');

router.post('/signup',userValidator.signup,(req,res)=>{
    userController.signup(req).then((data)=>{
        // console.log("data")
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch(err=>{
        res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    })
});

router.post('/login',userValidator.login,(req,res)=>{
    userController.login(req).then((data)=>{
        res.status(stringFile.SUCCESS_STATUS_CODE).send(data)
    }).catch(err=>{
        res.status(stringFile.INTERNAL_ERROR_STATUS_CODE).send(err)
    })
})

module.exports = router