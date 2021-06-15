import axios from 'axios'
import React, { useState } from 'react'
import PopUp from './PopUp'

const TagView = ({ tag, getTagList }) => {

	const [isView, setisView] = useState(false)
	const [isEdit, setIsEdit] = useState(false)

	const [newTag, setNewTag] = useState(tag.name)

	const [popData, setVisible] = useState(
		[
			"",
			"",
			false
		]
	)

	const updateTag = async () => {
		const url = `http://localhost:3000/tag/${tag._id}`
		if (newTag) {
			await axios.patch(url, { name: newTag })
			setIsEdit(false)
			getTagList()
		} else {
			setVisible([
				"Empty fields",
				"Please fill all fields to resister you",
				true
			])
		}
	}

	const deleteTag = async () => {
		const url = `http://localhost:3000/tag/${tag._id}`
		await axios.delete(url)
		setIsEdit(false)
		getTagList()
	}

	return (
		<>
			{
				popData[2]
					?
					<PopUp title={popData[0]} text={popData[1]} setVisible={setVisible} />
					:
					null
			}
			<li onClick={() => setisView(!isView)} className="tag-down">
				{/* <img className="icon-row" src="../../public/img/arrow.svg" alt="No se encuentra" /> */}
				<svg className="icon-row" viewBox="0 0 448 512">
					<path fill="white" d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
				</svg>
				{
					isEdit
						?
						<input onChange={e => setNewTag(e.target.value)} type="text" className="input-update-tag" defaultValue={tag.name} />
						:
						<span style={{ "fontWeight": "700" }}>{tag.name}</span>
				}

			</li>
			{
				isView && !isEdit
					?

					<li>
						<ul>
							{
								tag.passList.map(pass => (
									<>
										ID: {pass._id}
										<br />
										Title: {pass.title}
										<br />
										Username: {pass.username}
										<br />
										url: {pass.URL}
										<br />
									</>
								))
							}
						</ul>
						<li className="setting-item">
							<button onClick={() => setIsEdit(true)}>Edit</button>
							<button onClick={deleteTag}>Delete</button>
						</li>
					</li>
					:
					null
			}
			{
				isEdit
					?
					<li className="setting-item">
						<button onClick={updateTag}>Update</button>
						<button onClick={() => setIsEdit(false)}>Cancel</button>
					</li>
					:
					null
			}
		</>
	)
}

export default TagView
