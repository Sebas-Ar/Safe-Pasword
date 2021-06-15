import axios from 'axios'
import React, { useState } from 'react'
import { decrypt } from '../utils/crypto.js'
import PopUp from './PopUp'

const PasswordView = ({ pass, getPassword, tagList }) => {


	const [isView, setIsView] = useState(false)
	const [isEdit, setIsEdit] = useState(false)

	const [tagSelected, setTagSelected] = useState(pass.tagList)

	const [editData, setEditData] = useState({
		title: pass.title,
		URL: pass.URL,
		comment: pass.comment,
		username: pass.username,
		password: pass.password
	})

	const [popData, setVisible] = useState(
		[
			"",
			"",
			false
		]
	)


	const onChange = e => {
		setEditData(Object.assign({}, editData, { [e.target.name]: e.target.value }))
	}


	const onSubmitEditPass = async e => {

		e.preventDefault()

		const { title, URL, comment, username, password } = editData

		if (title && URL && comment && username && password) {

			const url = `http://localhost:3000/password/${pass._id}`

			await axios.put(url, { ...editData, tagList: tagSelected })

			setIsEdit(false)

			getPassword()

		} else {
			setVisible([
				"Empty fields",
				"Please fill all fields to resister you",
				true
			])
		}

	}


	const deletePass = async () => {

		const url = `http://localhost:3000/password/${pass._id}`

		await axios.delete(url)
		setIsEdit(false)
		getPassword()

	}

	const select = e => {

		const newTagList = [...tagSelected]

		if (tagSelected.find(t => t === e.target.value)) {
			newTagList.splice(newTagList.indexOf(e.target.value), 1)
		} else {
			newTagList.push(e.target.value)
		}

		setTagSelected(newTagList)

	}

	const IdToName = (tagId, tList) => {

		const tag = tList.find(t => t._id === tagId)

		return tag.name
	}

	const findTag = (existaList, _id) => {

		const exist = existaList.find(t => t === _id)
		console.log(exist)
		if (exist) {
			return true
		} else {
			return false
		}
	}

	return (
		<li key={pass._id}>
			{
				popData[2]
					?
					<PopUp title={popData[0]} text={popData[1]} setVisible={setVisible} />
					:
					null
			}
			{
				isEdit
					?
					<form onSubmit={onSubmitEditPass}>
						<label>
							<span>ID:</span>
							<p>{pass._id}</p>
						</label>
						<label>
							<span>Title:</span>
							<input onChange={onChange} type="text" name="title" defaultValue={pass.title} />
						</label>
						<label>
							<span>URL:</span>
							<input onChange={onChange} type="text" name="URL" defaultValue={pass.URL} />
						</label>
						<label>
							<span>Comment:</span>
							<input onChange={onChange} type="text" name="comment" defaultValue={pass.comment} />
						</label>
						<label>
							<span>Username:</span>
							<input onChange={onChange} type="text" name="username" defaultValue={pass.username} />
						</label>
						<label>
							<span>Password:</span>
							<input onChange={onChange} type="text" name="password" defaultValue={decrypt(pass.password)} />
						</label>
						<ul className="list-tags-to-select">
							<li>Tag List:</li>
							{
								tagList.map(t => (
									<li key={t._id}>
										<input defaultChecked={findTag(pass.tagList, t._id)} onClick={select} type="checkbox" value={t._id}></input>
										<span>{t.name}</span>
									</li>
								))
							}
						</ul>
						<div className="setting-item">
							<button type="submit">Confirm</button>
							<button type="button" onClick={() => setIsEdit(false)}>Cancel</button>
						</div>
					</form>
					:
					<ul>
						{
							isView
								?
								<li>
									<label>
										<span>ID: </span>
										<p>{pass._id}</p>
									</label>
								</li>
								:
								null
						}
						<li>
							<label>
								<span>Title: </span>
								<p>{pass.title}</p>
							</label>
						</li>
						<li>
							<label>
								<span>URL: </span>
								<p>{pass.URL}</p>
							</label>
						</li>
						<li>
							<label>
								<span>Comment: </span>
								<p>{pass.comment}</p>
							</label>
						</li>
						{
							isView
								?
								<>
									<li>
										<label>
											<span>Username: </span>
											<p>{pass.username}</p>
										</label>
									</li>
									<li>
										<label>
											<span>password: </span>
											<p>{decrypt(pass.password)}</p>
										</label>
									</li>
									<li>
										<ul className="tag-list-in-item">
											<p>Tag list</p>
											{
												pass.tagList.map(tagId => (
													<li key={tagId}>
														<span>{IdToName(tagId, tagList)}</span>
													</li>
												))
											}
										</ul>
									</li>
									<li className="setting-item">
										<button onClick={() => setIsView(false)}>Hide</button>
										<button onClick={() => {
											setIsEdit(true)
											setTagSelected(pass.tagList)
										}}>Edit</button>
										<button onClick={deletePass}>Delete</button>
									</li>
								</>
								:
								<li className="setting-item">
									<button onClick={() => setIsView(true)}>View Password</button>
								</li>

						}
					</ul>
			}
		</li>
	)
}

export default PasswordView
