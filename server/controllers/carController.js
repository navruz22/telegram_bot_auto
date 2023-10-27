const config = require("config");
const Car = require("../models/Car");



class CarController {
    async create(req, res) {
        try {
            const { name, info, price, months, procients, model } = req.body;
            const image = req.files[0];
            const filePdf = req.files[1] || null;

            const newCar = await Car({
                name,
                info,
                price,
                months,
                procients,
                model,
                image: config.get('baseUrl') + '/api/uploads/' + image.filename
            })

            if (filePdf) {
                newCar.filePdf = config.get('baseUrl') + '/api/uploads/' + filePdf.filename;
            }

            await newCar.save()

            const car = await Cat.findById(newCar._id)
                .populate("model", "name")

            res.status(200).json(car)

        } catch (error) {
            console.log(error)
            res.status(400).json({ message: 'Server error' })
        }
    }
}

module.exports = new CarController()