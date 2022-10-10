const express = require('express')
const router = express.Router();
const itemController = require('../controller/item')
const string_file = require('../common/string_file.json')

router.post('/createitem',(req,res)=>{
    itemController.createItem(req).then((data)=>{
        res.status(string_file.SUCCESS_STATUS_CODE).send(data)
    }).catch(err=>{
        res.status(string_file.INTERNAL_ERROR_STATUS_CODE).send(err)
    })
})

router.get('/getitem',(req,res)=>{
    itemController.getAllItems(req).then((data)=>{
        res.status(string_file.SUCCESS_STATUS_CODE).send(data)
    }).catch(err=>{
        // console.log('bhai galti kardi');
        res.status(string_file.INTERNAL_ERROR_STATUS_CODE).send(err);
    })
})

router.delete('/deleteItem/:itemId',(req,res)=>{
    itemController.deleteItem(req).then((data)=>{
        res.status(string_file.SUCCESS_STATUS_CODE).send(data)
    }).catch(err=> res.status(string_file.INTERNAL_ERROR_STATUS_CODE).send(err))
})

module.exports = router