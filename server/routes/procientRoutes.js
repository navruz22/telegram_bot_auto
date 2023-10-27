const Router = require('express')
const router = new Router()
const controller = require('../controllers/procientController')

router.post('/create', controller.create)
router.get('/get', controller.get)
router.delete('/delete/:id', controller.delete)

module.exports = router