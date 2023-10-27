const CarModel = require("../models/CarModel");


class CarModelController {
    async create(req, res) {
        try {
            const { name, car_types } = req.body;

            if (!name) {
                return res.status(500).json({message: "Введите название модели!"})
            }
            if (car_types.length === 0) {
                return res.status(500).json({message: "Выберите тип машины!"})
            }

            const isExist = await CarModel.findOne({name})
            if (isExist) {
                return res.status(500).json({message: `Тип машины с названием ${name} существует!`})
            }

            const newCarModel = new CarModel({name, carTypes: car_types})
            await newCarModel.save()

            const response = await CarModel.findById(newCarModel._id)
            .populate("carTypes", "name")
            .lean()

            res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Server error'})
        }
    }

    async get(req, res) { 
        try {
            const carModels = await CarModel.find()
            .populate("carTypes", "name")
            .lean()
            
            res.status(200).json(carModels)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Server error'})
        }
    }

    async update(req, res) {
        try {
            const { _id, name, car_types } = req.body;

            if (!name) {
                return res.status(500).json({message: "Введите название модели!"})
            }
            if (car_types.length === 0) {
                return res.status(500).json({message: "Выберите тип машины!"})
            }

            await CarModel.findByIdAndUpdate(_id, {
                name,
                carTypes: car_types
            })

            const response = await CarModel.findById(_id)
            .populate("carTypes", "name")
            .lean()

            res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Server error'})
        }
    }

}

module.exports = new CarModelController()