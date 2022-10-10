require("dotenv").config();
const UserModel = require("../model/user");
const stringFile = require("../common/string_file.json");
const commonFunction = require("../common/common_function");
const signup = (req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let body = req.body;
      let userResponse = await UserModel.create({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        mobileNumber: body.mobileNumber,
      }).catch((error) =>
        reject({
          message: error.message,
        })
      );
      console.log(userResponse);
      resolve({
        _id: userResponse._id,
        message: stringFile.SUCCESS_MESSAGE,
        firstName: userResponse.firstName,
        lastName: userResponse.lastName,
        email: userResponse.email,
        mobileNumber: userResponse.mobileNumber,
      });
    } catch (error) {
      reject({
        message: error.message,
      });
    }
  });
};

const login = (req) => {
  return new Promise(async (resolve, reject) => {

    try {
      let body = req.body;
      body.email = body.email.trim();
      const loginResponse = await UserModel.findOne(
        {
          $and: [
            {
              $or: [
                {
                  email: body.email.toLowerCase(),
                },
                {
                  email: body.email.toUpperCase(),
                },
              ],
            },
            {
              password: body.password,
            },
          ],
        },
        {
          new: true,
        }
      ).catch((err) =>
        reject({
          message: err.message,
        })
      );
      const userDetails = await UserModel.findOne({ _id: loginResponse._id });
      resolve({
        _id: loginResponse._id,
        message: stringFile.SUCCESS_MESSAGE,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber,
      });
    } catch (error) {
      reject({
        message: error.message,
      });
    }
  });
};

module.exports = {
  signup,
  login,
};
