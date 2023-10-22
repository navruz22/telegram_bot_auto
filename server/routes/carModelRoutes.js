const Router = require('express')
const router = new Router()
const controller = require('../controllers/carModelController')

router.post('/create', controller.create)
router.get('/get', controller.get)

module.exports = router