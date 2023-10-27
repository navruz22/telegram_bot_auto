const {Schema, model, ObjectId} = require("mongoose")


const CarModel = new Schema({
    name: {type: String, required: true},
    carTypes: [{type: Schema.ObjectId, ref: "CarType", required: true}]
})

module.exports = model('CarModel', CarModel)