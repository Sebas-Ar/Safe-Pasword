import express from 'express'
import { loginUser, registerUser, auth } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/', loginUser)
      .get('/:token', auth)
      .post('/', registerUser)

export default router
