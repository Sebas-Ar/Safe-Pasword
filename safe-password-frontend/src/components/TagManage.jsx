import axios from 'axios'
import React, { useEffect, useState } from 'react'
import TagView from './TagView'
import PopUp from './PopUp'

const TagManage = () => {

	const [CreatetTag, setCreatetTag] = useState(false)
	const [tagList, setTagList] = useState([])

	const [tag, setCreateTagData] = useState('')

	const [popData, setVisible] = useState(
		[
			"",
			"",
			false
		]
	)

	useEffect(() => {

		getTagList()

	}, [])

	const getTagList = async () => {
		const _id = localStorage.getItem('_id')
		const url = `http://localhost:3000/tag/${_id}`
		const response = await axios.get(url)
		console.log(response)

		console.log(response.data.tagList)
		console.log(response.data.passList)
		const copy = [...response.data.tagList]
		for (let i = 0; i < copy.length; i++) {
			copy[i].passList = response.data.passList[i]
		}

		setTagList(response.data.tagList)
	}

	const createTag = async e => {
		e.preventDefault()

		if (tag) {
			const _id = localStorage.getItem('_id')
			const url = `http://localhost:3000/tag/${_id}`
			await axios.post(url, { name: tag })
			setCreateTagData('')
			setCreatetTag(false)
			getTagList()
		} else {
			setVisible([
				"Empty fields",
				"Please fill all fields to resister you",
				true
			])
		}
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
				CreatetTag
					?
					<section id="add-tag" class="add-item">
						<h2>Add Tag</h2>
						<button onClick={() => setCreatetTag(false)} class="close-add-item">
							<svg viewBox="0 0 352 512">
								<path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
							</svg>
						</button>
						<form onSubmit={createTag}>
							<input onChange={e => setCreateTagData(e.target.value)} type="text" placeholder="New tag" />
							<button>Add Tag</button>
						</form>
					</section>
					:
					null
			}

			<section id="tag-list" class="item-list">
				<h2>Tag List</h2>
				<button class="open-add-item" onClick={() => setCreatetTag(true)}>
					<svg viewBox="0 0 448 512">
						<path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
					</svg>
					Add Tag
				</button>
				{/* <!-- Lista de Tags agregados por JS --> */}
				<ul id="ul-tag-list">
					{
						tagList.map(t => (
							<TagView key={t._id} tag={t} getTagList={getTagList} />
						))
					}
				</ul>
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
					color: white;
					border-radius: 1rem;
				}

				.add-item {
					margin-bottom: 2rem;
				}

				.close-add-item, 
				.open-add-item {
					font-weight: 600;
					color: white;
					position: absolute;
					top: 2rem;
					right: 2rem;
					background-color: unset;
					width: 30px;
					transition: transform 0.5s;
				}

				.open-add-item {
					display: grid;
					grid-template-columns: 20px auto;
					column-gap: 10px;
					align-items: center;
					right: unset;
					width: unset;
					left: 2rem;
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

				.add-item ul input {
					margin-left: 20px;
					margin-right: 10px;
				}

				.item-list > ul {
					display: grid;
					row-gap: 10px;
				}

				.item-list > ul > li > ul > li {
					margin: 10px 0;
				}

				.item-list > ul > li > form > label {
					display: block;
					margin: 10px 0;
				}

				.item-list > ul p {
					display: inline;
				}

				.item-list > ul input {
					background-color: unset;
					border: none;
					padding: 0;
					font-size: 15px;
					border-bottom: 2px solid white;
					margin-bottom: -2px;
					color: white;
					font-weight: 700;
				}

				.item-list > ul input::placeholder {
					color: rgba(255, 255, 255, 0.5);
				}

				.item-list > ul span {
					margin-right: 8px;
					font-weight: 700;
				}

				.item-list .setting-item {
					display: flex;
					justify-content: space-around;
					margin: 10px 0 0 0;
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

export default TagManage
