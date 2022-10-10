const express = require('express');
const router = express.Router();
router.use('/user',require('./router/user'))
router.use('/item',require('./router/item'))

module.exports = router