import jwt from 'jsonwebtoken'

import { generateToken } from '../auth/jwt.js'
import User from '../models/user.model.js'
import { decrypt, encrypt } from '../utils/crypto.js'


export const auth = (req, res) => {
    const { token } = req.params
    if (token !== 'undefined') {

        try {

            const tokenVerified = jwt.verify(token, process.env.SECRET_KEY)

            res.json({ message: 'token valido', auth: true })

        } catch (error) {

            res.json({ message: 'unauthoized user', auth: false })

        }

    } else {

        res.status(403).json({ message: 'unauthoized user', auth: false })
    }
}

export const loginUser = async (req, res) => {

    const { username, password } = req.query

    const userExist = await User.findOne({ username })

    if (userExist) {

        const userValidated = decrypt(userExist.password) === password

        if (userValidated) {

            const token = generateToken(userExist)

            res.json({ message: 'validated login', token: token, _id: userExist._id, name: userExist.name })

        } else {

            res.status(403).json({ message: 'incorrect data' })

        }

    } else {

        res.status(404).json({ message: 'user not found' })

    }


}

export const registerUser = async (req, res) => {

    const { name, username, password } = req.body

    const userExist = await User.findOne({ username })

    if (!userExist) {
        const newUser = new User({
            name,
            username,
            password: encrypt(password),
            passwordLIst: [],
            tagLIst: []
        })

        const response = await newUser.save()

        res.json({ message: 'registered user', response })
    } else {
        res.status(400).json({ message: 'user alreasy exist' })
    }


}
