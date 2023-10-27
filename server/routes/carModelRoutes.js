const Router = require('express')
const router = new Router()
const controller = require('../controllers/carModelController')

router.post('/create', controller.create)
router.get('/get', controller.get)
router.put('/update', controller.update)

module.exports = router