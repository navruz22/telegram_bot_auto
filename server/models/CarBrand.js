const {Schema, model} = require("mongoose")


const CarBrand = new Schema({
    name: {type: String, required: true},
    carTypes: [{type: Schema.ObjectId, ref: "CarType", required: true}]
})

module.exports = model('CarBrand', CarBrand)