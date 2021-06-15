import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PasswordView from './PasswordView'
import PopUp from './PopUp'


const PasswordManage = () => {

	const [passwordList, setPasswordList] = useState([])
	const [activeCreatePass, setActiveCreatePass] = useState(false)
	const [tagList, setTagList] = useState([])

	const [createPassData, setCreatePassData] = useState({})

	const [tagSelected, setTagSelected] = useState([])

	const [popData, setVisible] = useState(
		[
			"",
			"",
			false
		]
	)

	useEffect(() => {
		getPassword()
	}, [])

	const getPassword = async () => {
		const _id = localStorage.getItem('_id')

		const url = `http://localhost:3000/password/${_id}`

		const response = await axios.get(url)
		setPasswordList(response.data.passwordList)
		setTagList(response.data.tagList)
	}

	const onChangeCreatePass = e => {
		setCreatePassData(Object.assign({}, createPassData, { [e.target.name]: e.target.value }))
	}

	const onSubmitCreateItem = async e => {
		e.preventDefault()
		const { title, username, password, URL, comment/* , tagList */ } = createPassData

		if (title && username && password && URL && comment) {
			const _id = localStorage.getItem('_id')
			const url = `http://localhost:3000/password/${_id}`
			const response = await axios.post(url, { ...createPassData, tagList: tagSelected })

			console.log(response)
			getPassword()
			setCreatePassData({})
			setActiveCreatePass(false)

		} else {
			setVisible([
				"Empty fields",
				"Please fill all fields to resister you",
				true
			])
		}
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

	return (
		<div>
			{
				popData[2]
					?
					<PopUp title={popData[0]} text={popData[1]} setVisible={setVisible} />
					:
					null
			}
			{
				activeCreatePass
					?
					<section id="add-item" className="add-item">
						<h2>Add Item</h2>
						<button onClick={() => setActiveCreatePass(!activeCreatePass)} >
							<svg className="close-add-item" viewBox="0 0 352 512">
								<path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
							</svg>
						</button>
						<form onSubmit={onSubmitCreateItem}>
							<input onChange={onChangeCreatePass} type="text" name="title" placeholder="Titulo" />
							<input onChange={onChangeCreatePass} type="text" name="username" placeholder="Username" />
							<input onChange={onChangeCreatePass} type="password" name="password" placeholder="Password" />
							<input onChange={onChangeCreatePass} type="password" name="repeatPassword" placeholder="Repeat Password" />
							<input onChange={onChangeCreatePass} type="text" name="URL" placeholder="URL" />
							<textarea onChange={onChangeCreatePass} name="comment" placeholder="Comment"></textarea>

							<ol id="taglist-item">
								<li style={{ "fontWeight": "700", "fontSize": "18px" }}>Tag List:</li>
								{
									tagList.map(tag => (
										<li>
											<input onClick={select} name="tag" type="checkbox" value={tag._id}></input>
											<span>{tag.name}</span>
										</li>
									))
								}
							</ol>
							<button>Add Item</button>
						</form>
					</section>
					:
					null
			}
			<section id="item-list" className="item-list">
				<h2>Item List</h2>
				<button className="open-add-item" onClick={() => setActiveCreatePass(!activeCreatePass)}>
					<svg viewBox="0 0 448 512">
						<path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
					</svg>
					Add Item
				</button>
				<ol id="ol-item-list" reversed={true}>
					{/* <!-- Lista de Items agregados por JS --> */}
					{
						passwordList.map(pass => (
							<PasswordView tagList={tagList} key={pass._id} pass={pass} getPassword={getPassword} />
						))
					}
				</ol>
			</section>

			<style jsx>{`

				.hiden-prop {
					display: none;
				}

				.item-list,
				.add-item {
					position: relative;
					padding: 30px;
					background: var(--main-color);
					width: 30rem;
					margin: auto;
					margin-top: 30px;
					color: white;
					border-radius: 1rem;
				}

				.close-add-item {
					font-weight: 600;
					color: white;
					position: absolute;
					top: 2rem;
					right: 2rem;
					background-color: unset;
					width: 20px;
					transition: transform 0.5s;
				}

				.open-add-item {
					display: grid;
					color: white;
					grid-template-columns: 20px auto;
					column-gap: 10px;
					align-items: center;
					right: unset;
					width: unset;
					left: 2rem;
					transition: transform 0.5s;
				}

				.close-add-item:hover,
				.open-add-item:hover {
					transform: scale(1.2);
				}

				.close-add-item svg,
				.open-add-item svg {
					display: inline-block;
					color: white;
				}

				.item-list h2,
				.add-item h2 {
					font-size: 1.5rem;
					text-transform: uppercase;
					margin-bottom: 30px;
					text-align: center;
				}

				.add-item form > input,
				.add-item textarea,
				.add-item li {
					display: block;
					margin: 10px 0;
					width: 100%;
				}

				.add-item form > input,
				.add-item form > textarea {
					font-size: 1rem;
					border: none;
					background-color: unset;
					font-weight: 700;
					border-bottom: 3px solid white;
					background-color: unset;
					color: white;
				}

				.add-item form > textarea::placeholder,
				.add-item form > textarea {
					font-weight: 900;
					font-size: 17px;
				}

				.add-item form > input::placeholder,
				.add-item form > textarea::placeholder {
					color: rgba(255, 255, 255, 0.418);
				}

				.add-item form button {
					display: block;
					margin: auto;
					background-color: white;
					color: rgba(0, 0, 0, 0.658);
					font-weight: 600;
					display: block;
					padding: 5px 30px;
					border-radius: 1rem;
				}

				.add-item ol input {
					margin-left: 20px;
					margin-right: 10px;
				}

				.item-list > ol {
					display: grid;
					row-gap: 10px;
				}

				.item-list > ol > li > ol > li {
					margin: 10px 0;
				}

				.item-list > ol > li > form > label {
					display: block;
					margin: 10px 0;
				}

				.item-list > ol p {
					display: inline;
				}

				.item-list > ol input {
					background-color: unset;
					border: none;
					padding: 0;
					font-size: 15px;
					border-bottom: 2px solid white;
					margin-bottom: -2px;
					color: white;
					font-weight: 700;
				}

				.item-list > ol input::placeholder {
					color: rgba(255, 255, 255, 0.5);
				}

				.item-list > ol span {
					margin-right: 8px;
					font-weight: 700;
				}

				.item-list .setting-item {
					display: flex;
					justify-content: space-around;
					margin: 10px 0 1.5rem 0;
				}

				.item-list .setting-item button {
					color: rgba(0, 0, 0, 0.658);
					font-weight: 600;
					display: block;
					padding: 5px 30px;
					border-radius: 1rem;
					margin: 10px 0 0 0;
				}

				.tag-down,
				.tag-up {
					display: grid;
					grid-template-columns: 20px auto;
					align-items: center;
					cursor: pointer;
				}

				.icon-row {
					height: 15px;
					transition: transform .5s;
				}

				.tag-down:hover .icon-row {
					transform: rotate(90deg);
				}

				.tag-down span,
				.tag-up span {
					text-transform: uppercase;
				}

				.tag-up:hover .icon-row {
					transform: rotate(-90deg);
				}

				.list-tags-to-select {
					font-weight: 700;
				}

				.list-tags-to-select li {
					margin-top: 10px;
					margin-left: 10px;
				}

				.list-tags-to-select li:nth-child(1) {
					margin-left: 0px;
				}

				.list-tags-to-select input {
					margin-right: 10px;
				}

				.popup-wrapper {
					position: fixed;
					top: 0;
					background-color: #33333333;
					width: 100%;
					height: 100vh;
					display: none;
					place-items: center;
				}

				.popup {
					background-color: white;
					padding: 2rem;
					border-radius: 1rem;
					display: grid;
					row-gap: 1rem;
				}

				.popup input {
					background-color: unset;
					border: none;
					padding: 0;
					font-size: 15px;
					border-bottom: 2px solid var(--main-color);
					margin-bottom: -2px;
					color: var(--main-color);
				}

				.popup input::placeholder {
					color: #1485a154
				}

				.wrapper-buttons {
					display: flex;
					justify-content: space-around;
					
				}

				.wrapper-buttons button {
					color: rgba(0, 0, 0, 0.658);
					font-weight: 600;
					display: block;
					padding: 5px 30px;
					border-radius: 1rem;
					margin: 0 10px;
				}

				#delete-tag:disabled {
					cursor: default
				}

				.input-update-tag {
					cursor: pointer;
				}

				.setting-item button {
					background-color: whitesmoke;
					color: rgba(0, 0, 0, 0.658)
				}

				.container {
					cursor: auto;
					position: fixed;
					z-index: 1000;
					height: 100vh;
					width: 100%;
					top: 0;
					left: 0;
					background-color: #00000044;
					display: grid;
					justify-content: center;
					align-items: center;
				}

				.popup {
					position: relative;
					width: 500px;
					height: 270px;
					background-color: var(--main-color);
					border-radius: 1rem;
					color: white;
					justify-content: center;
					padding: 2rem;
					box-sizing: border-box;
				}

				.popup-close {
					position: absolute;
					right: 0;
					display: grid;
					justify-content: center;
					background-color: unset;
					width: 30px;
					height: 30px;
					padding: 0;
					margin: 1.5rem;
				}

				.popup-close svg {
					height: 100%;
				}

				.popup-icon {
					margin: auto;
					height: 70px;
				}

				.popup-titulo {
					text-align: center;
					font-size: 2rem
				}

				.popup-text {
					text-align: center

				}

				.popup-button {
					background-color: white;
					border-radius: 1rem;
				}
			
			`}</style>
		</div>
	)
}

export default PasswordManage
