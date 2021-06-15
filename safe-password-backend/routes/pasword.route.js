import express from "express";
import { validateToken } from '../auth/jwt.js'
import { createPassword, getPasswordList, updatePassword, deletePassword } from '../controllers/password.controller.js'

const router = express.Router();

router.get('/:id'/* , validateToken */, getPasswordList)
	  .post('/:id'/* , validateToken */, createPassword)
	  .put('/:passId'/* , validateToken */, updatePassword)
	  .delete('/:passId'/* , validateToken */, deletePassword)

export default router