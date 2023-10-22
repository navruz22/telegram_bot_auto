const {Schema, model, ObjectId} = require("mongoose")


const Month = new Schema({
    month: {type: Number, required: true}
})

module.exports = model('Month', Month)