const ItemModel = require('../model/item');
const string_file = require('../common/string_file.json');
const {
    ObjectId
  } = require('mongoose').Types
const createItem = (req)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let body = req.body
            let itemResponse = await ItemModel.create({
                itemName : body.itemName,
            }).catch(error=>reject({message: error.message}))
            resolve({
                _id : itemResponse._id,
                message: string_file.SUCCESS_MESSAGE,
                itemName: itemResponse.itemName,
            })
        } catch (error) {
            reject({
                message : error.message
            })
        }
    })
}

const getAllItems = (req)=>{
    return new Promise(async(resolve,reject)=>{
        const isLoggedIn = true;
        let skip = req.query.skip ? parseInt(req.query.skip) : 0
        let limit = req.query.limit ? parseInt(req.query.limit) : 10 
        if(isLoggedIn){
            try {
                const {page=1,limit=10} = req.query;
                const itemResponse = await ItemModel.find({},{__v:0})
                .sort({itemName:1})
                .skip(skip)
                .limit(limit)
                .catch(err=>reject({message : err.message}))
                // console.log(itemResponse);
                resolve({
                    itemResponse
                })
            } catch (error) {
                reject({
                    message : error.message
                })
            }
        }
        else{
            reject({
                message : string_file.UNAUTHORISED_ACCESS_MESSAGE
            })
        }
        
    })
}


const deleteItem = (req)=>{
    return new Promise(async(resolve,reject)=>{
        try {
            let body = req.params
             await ItemModel.deleteOne({
                _id: ObjectId(body.itemId)
             }).catch(e=>reject({
                message: e.message
             }))
             resolve({
                message: string_file.DELETE_MESSAGE
             })
        } catch (error) {
            reject({
                message : error.message
            })
        }
    }) 
}
module.exports = {
    createItem,getAllItems,deleteItem
}