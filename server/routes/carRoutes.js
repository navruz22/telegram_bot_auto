const Router = require('express')
const { upload } = require('../services/fileService')
const router = new Router()
const controller = require('../controllers/carController')

router.post('/create', upload, controller.create)

module.exports = router