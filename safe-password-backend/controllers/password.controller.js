import mongoose from 'mongoose'

import Password from '../models/password.model.js'
import User from '../models/user.model.js'
import Tag from '../models/tag.model.js'
import { decrypt, encrypt } from '../utils/crypto.js'


export const createPassword = async (req, res, next) => {

	const { id } = req.params

	const { title, username, password, URL, comment, tagList } = req.body
	console.log(tagList)
	const newPassword = new Password({
		userId: id,
		title,
		username,
		password: encrypt(password),
		URL,
		comment,
		tagList: tagList ? tagList : []
	})

	const createdPassword = await newPassword.save()

	const modifiedUser = await User.findOneAndUpdate(
		{
			_id: id
		},
		{
			$push: {
				passwordList: createdPassword['_id']
			}
		},
		{
			new: true
		}
	)

	res.json({ message: 'saved password', createdPassword, modifiedUser })
}

export const getPasswordList = async (req, res) => {

	const { id } = req.params

	const passwordList = await Password.find({ userId: id })
	const tagList = await Tag.find({ userId: id })

	res.json({ message: 'pasword list', passwordList, tagList })

}

export const updatePassword = async (req, res) => {
	// password id
	const { passId } = req.params
	const { title, username, password, URL, comment, tagList } = req.body

	const modifiedPassword = await Password.updateOne(
		{
			_id: passId
		},
		{
			title,
			username,
			password: encrypt(password),
			URL,
			comment,
			tagList: tagList ? tagList : []
		},
		{
			new: true
		}
	)

	res.json({ message: 'password updated', modifiedPassword })

}

export const deletePassword = async (req, res) => {

	const { passId } = req.params
	const { id } = req.query

	await Password.findOneAndDelete(
		{
			_id: passId
		}
	)

	await User.findOneAndUpdate(
		{
			_id: id
		},
		{
			$pull: {
				passwordList: passId
			}
		}
	)

	res.json({ message: 'Password deleted' })

}