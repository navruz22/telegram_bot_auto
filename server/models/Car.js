const {Schema, model} = require("mongoose")


const Car = new Schema({
    name: {type: String, required: true},
    info: {type: String, required: true},
    image: {type: String, required: true},
    filePdf: {type: String, required: true},
    model: {type: Schema.ObjectId, ref: "CarModel", required: true},
    price: {type: Number, required: true},
    months: [{type: Number, required: true}],
    procients: [{type: Number, required: true}],
})

module.exports = model('Car', Car)