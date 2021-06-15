import mongoose from 'mongoose'

const passwordSchema = mongoose.Schema({
	userId: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	URL: {
		type: String,
		required: true
	},
	comment: {
		type: String,
		required: true
	},
	tagList: {
		type: Array,
		required: true
	},

})

export default mongoose.model('Password', passwordSchema)