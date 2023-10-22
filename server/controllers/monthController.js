const Month = require("../models/Month");


class MonthController {
    async create(req, res) {
        try {
            const { month } = req.body;

            if (!month) {
                return res.status(500).json({message: "Введите название!"})
            }

            const isExist = await Month.findOne({month})
            if (isExist) {
                return res.status(500).json({message: `Тип машины с названием ${month} существует!`})
            }

            const newMonth = new Month({month})
            await newMonth.save()

            res.status(200).json(newMonth)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Server error'})
        }
    }

    async get(req, res) {
        try {
            const months = await Month.find();
            
            res.status(200).json(months)
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Server error'})
        }
    }

}

module.exports = new MonthController()