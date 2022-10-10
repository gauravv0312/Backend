require('dotenv').config()
const mongoose = require('mongoose');

exports.connectDatabase = () => {
    mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000
    })
}

//   exports.encode = (data) => {
//     return {
//       output: Buffer.from(JSON.stringify(data)).toString('base64')
//     }
// }

// exports.trim = (string) => {
//   return string.trim()
// }
// exports.toLowerCase = (string) => {
//   return string.toLowerCase()
// }
