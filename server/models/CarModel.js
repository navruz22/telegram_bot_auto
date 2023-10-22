const {Schema, model, ObjectId} = require("mongoose")


const CarModel = new Schema({
    name: {type: String, required: true},
    carTypes: [{type: Schema.ObjectId, required: true}]
})

module.exports = model('CarModel', CarModel)