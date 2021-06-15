import Tag from '../models/tag.model.js'
import Password from '../models/password.model.js'

export const createTag = async (req, res) => {

	const { userId } = req.params
	const { name } = req.body

	const newTag = new Tag({
		userId,
		name
	})

	const response = await newTag.save()

	res.json({ message: 'tag created', response })
}

export const getTagList = async (req, res, next) => {

	const { userId } = req.params
	console.log(req.params)

	const tagList = await Tag.find(/* ).lean().exec( */{ userId })
	console.log(tagList)
	const passList = []
	for (let i = 0; i < tagList.length; i++) {
		const passwordList = await Password.find({ tagList: String(tagList[i]._id) })
		passList.push(passwordList)
	}

	res.json({ message: 'tag list', tagList, passList })
}


export const updateTag = async (req, res) => {

	const { tagId } = req.params
	const { name } = req.body

	const newTag = await Tag.findOneAndUpdate(
		{
			_id: tagId
		},
		{
			$set: {
				name
			}
		},
		{
			new: true
		}
	)

	res.json({ message: 'tag updated', newTag })
}

export const deleteTag = async (req, res) => {

	const { tagId } = req.params

	await Tag.findOneAndDelete(
		{
			_id: tagId
		}
	)

	const passwordModified = await Password.updateMany(
		{
			tagList: tagId
		},
		{
			$pull: {
				tagList: tagId
			}
		},
		{
			new: true
		}
	)

	console.log(passwordModified)

	res.json({ message: 'tag deleted', passwordModified })
}