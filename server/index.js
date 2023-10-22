const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const app = express()
const PORT = config.get('PORT') || 8001
const corsMiddleware = require('./middleware/cors.middleware')
const router = require("./routes/routes")

app.use(corsMiddleware)
app.use(express.json())
app.use(express.static('static'))
app.use('/api', router)

const start = async () => {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })

        app.listen(PORT, () => {
            console.log('Server started on port ', PORT)
        })
    } catch (e) {
        console.log(e)
    }
}

start()