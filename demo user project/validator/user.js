const {
    check,
    validationResult
} = require('express-validator');
const stringFile = require('../common/string_file.json');
const userModel = require('../model/user');
const commonFunction = require('../common/common_function')


exports.signup = [
    check('firstName').not().isEmpty().withMessage(stringFile.FIRSTNAME_NOT_EMPTY),
    check('lastName').not().isEmpty().withMessage(stringFile.LASTNAME_NOT_EMPTY),
    check('email').not().isEmpty().withMessage(stringFile.EMAIL_NOT_EMPTY).isEmail().withMessage(stringFile.VALID_EMAIL_ID),
    check('password').not().isEmpty().withMessage(stringFile.PASSWORD_NOT_EMPTY).isLength({min: 6}).withMessage(stringFile.PASSWORD_VALIDATION_MESSAGE),
    check('mobileNumber').not().isEmpty().withMessage(stringFile.MOBILENUMBER_NOT_EMPTY),
    check('email').custom(async (value) => {
        const user = await userModel.findOne({
            email: value.toLowerCase()
        }, {
            _id: 1
        }).lean().catch(e => {
            throw Error(e.message);
        });
        if (user) throw Error(stringFile.USER_ALREADY_EXISTS)
        else return true
    }),
    (req, res, next) => {
        const errorValidation = validationResult(req)
        if (!errorValidation.isEmpty()) {
            return res.status(stringFile.VALIDATION_ERROR_STATUS_CODE).send({
                message: errorValidation.errors.shift().msg
            })
        }
        next()
    }
]

exports.login = [
    check('email').not().isEmpty().withMessage(stringFile.EMAIL_NOT_EMPTY).isEmail().withMessage(stringFile.VALID_EMAIL_ID).trim(),
    check('password').not().isEmpty().withMessage(stringFile.PASSWORD_NOT_EMPTY).matches(/^.{6,20}$/,'i').withMessage(stringFile.PASSWORD_VALIDATION_MESSAGE),
    check('email').custom(async(value)=>{
        const user = await userModel.findOne({
            email : value.toLowerCase()
        },{
            _id:1
        }).lean().catch(e=>{
            throw Error(e.message)
        })
        if(!user) throw Error(stringFile.WRONG_EMAIL)
        else return true
    }),
    check('password').custom(async(value,{
        req})=>{
            const user = await userModel.findOne({
                email : req.body.email.toLowerCase(),
                password : value
            },{
                _id:1,
                status:1
            }).lean().catch(e=>{
                throw Error(e.message)
            })
            if(!user) throw Error(stringFile.WRONG_PASSWORD)
              else return true
        }),
        (req,res,next)=>{
            const errorValidation = validationResult(req)
            if(!errorValidation.isEmpty()){
                return res.status(stringFile.VALIDATION_ERROR_STATUS_CODE).send(({message: errorValidation.errors.shift().msg}))
            }
            next()
        }
]  