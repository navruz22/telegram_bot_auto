const {Schema, model, ObjectId} = require("mongoose")


const Procient = new Schema({
    procient: {type: Number, required: true}
})

module.exports = model('Procient', Procient)