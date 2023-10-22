const CarType = require("../models/CarType");


class CarTypeController {
    async create(req, res) {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(500).json({message: "Введите название!"})
            }

            const isExist = await CarType.findOne({name})
            if (isExist) {
                return res.status(500).json({message: `Тип машины с названием ${name} существует!`})
            }

            const newCarType = new CarType({name})
            await newCarType.save()

            res.status(200).json(newCarType)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Server error'})
        }
    }

    async get(req, res) {
        try {
            const carTypes = await CarType.find();
            
            res.status(200).json(carTypes)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Server error'})
        }
    }

}

module.exports = new CarTypeController()