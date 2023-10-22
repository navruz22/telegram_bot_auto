const Procient = require("../models/Procient");


class ProcientController {
    async create(req, res) {
        try {
            const { procient } = req.body;

            if (!procient) {
                return res.status(500).json({message: "Введите название!"})
            }

            const isExist = await Procient.findOne({procient})
            if (isExist) {
                return res.status(500).json({message: `Тип машины с названием ${procient} существует!`})
            }

            const newProcient = new Procient({procient})
            await newProcient.save()

            res.status(200).json(newProcient)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Server error'})
        }
    }

    async get(req, res) {
        try {
            const procients = await Procient.find();
            
            res.status(200).json(procients)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Server error'})
        }
    }

}

module.exports = new ProcientController()