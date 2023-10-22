const Router = require('express')
const router = new Router()
const auth_middleware = require('../middleware/auth.middleware')
const authRoutes = require('./authRoutes')
const carTypeRoutes = require('./carTypeRoutes')
const carModelRoutes = require('./carModelRoutes')
const procientRoutes = require('./procientRoutes')
const monthRoutes = require('./monthRoutes')

router.use('/auth', authRoutes)
router.use('/car_type',  auth_middleware, carTypeRoutes)
router.use('/car_model',  auth_middleware, carModelRoutes)
router.use('/procient',  auth_middleware, procientRoutes)
router.use('/month',  auth_middleware, monthRoutes)

module.exports = router