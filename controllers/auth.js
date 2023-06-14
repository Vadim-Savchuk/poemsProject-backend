import bcrypt from 'bcrypt'
import jwt    from 'jsonwebtoken'

import User from '../models/User.js'

// Registration user
export async function register(req, res) {
    try {
        const { username, password } = req.body

        const isUsed = await User.findOne({ username })

        if (isUsed) {
            return res.json({ message: 'Такий користувач вже існує' })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        const newUser = new User({
            username,
            password: hash
        })

        const token = jwt.sign(
            { id: newUser._id, },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        await newUser.save()

        res.json({
            token,
            newUser,
            message: 'Реєстраці пройшла успішно'
        })

    } catch (error) {
        res.json({ message: 'Сталась помилка при реєстрації користувача' })
    }
}

// Login User
export async function login(req, res) {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!user) {
            return res.json({ message: 'Такого користувача не існує' })
        }

        const correctIsPassword = await bcrypt.compare(password, user.password)

        if (!correctIsPassword) {
            return res.json({ message: 'пароль не правильний' })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        res.json({
            user,
            token,
            message: 'Ви авторизовані'
        })

    } catch (error) {
        res.json({ message: 'Сталась помилка при реєстрації користувача' })
    }
}

// Get user
export async function getMe(req, res) {
    try {
        const user = await User.findById(req.userId)

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        )

        res.json({
            user,
            token
        })

    } catch (error) {
        res.json({ message: 'Сталась помилка при отримані даних про користувача' })
    }
}