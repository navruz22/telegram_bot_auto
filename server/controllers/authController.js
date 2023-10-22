const User = require("../models/User");
const bcrypt = require("bcryptjs")
const config = require("config")
const jwt = require("jsonwebtoken")


class AuthController {
    async create(req, res) {
        try {
            const { login, password } = req.body;

            if (!login || !password) {
                return res.status(400).json({ message: "Заполните все формы!" })
            }

            const isExistUser = await User.findOne({ login })

            if (isExistUser) {
                return res.status(400).json({ message: "Пользователь с таким именем уже существует!" })
            }

            const hashPassword = bcrypt.hashSync(password, 7);

            const newUser = new User({ login, password: hashPassword })
            await newUser.save()

            res.status(200).json("User is registered!")
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Server error'})
        }
    }

    async login(req, res) {
        try {
            const { login, password } = req.body;

            if (!login || !password) {
                return res.status(400).json({ message: "Введите логин или пароль!" })
            }

            const user = await User.findOne({ login })

            if (!user) {
                return res.status(400).json({ message: `Пользователь ${login} не найден!` })
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: `Введен неверный пароль` })
            }
            const token = jwt.sign({login}, config.get("jwtSecret"), { expiresIn: "24h" })
            return res.json({ token })

        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'Server error'})
        }
    }
}

module.exports = new AuthController()