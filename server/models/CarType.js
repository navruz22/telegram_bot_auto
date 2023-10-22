const {Schema, model, ObjectId} = require("mongoose")


const CarType = new Schema({
    name: {type: String, required: true},
})

module.exports = model('CarType', CarType)