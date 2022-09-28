const router = require('express').Router()
const main = require('./Router')

router.use('/',main)

module.exports = router