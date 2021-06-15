import axios from 'axios'
import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import PopUp from '../components/PopUp'

const Uno = () => {

	const [data, setData] = useState({})
	const [login, setLogin] = useState(false);
	const [popData, setVisible] = useState(
		[
			"",
			"",
			false
		]
	)

	const onChange = e => {
		setData(Object.assign({}, data, { [e.target.name]: e.target.value }))
	}

	const onSubmit = async e => {
		e.preventDefault()

		const { username, password } = data
		if (username && password) {
			const url = `http://localhost:3000/user?username=${username}&password=${password}`
			try {
				const response = await axios.get(url)

				if (response.data) {
					console.log(response)
					localStorage.setItem('token', response.data.token)
					localStorage.setItem('_id', response.data._id)
					localStorage.setItem('name', response.data.name)
					setLogin(true)
				}
			} catch (error) {
				setVisible(
					[
						"Invalid data",
						"User or password incorrect",
						true
					]
				)
			}
		} else {
			setVisible(
				[
					"Empty fields",
					"Please fill all fields to resister you",
					true
				]
			)

		}
	}

	return (
		<div className="body">
			{
				popData[2]
					?
					<PopUp title={popData[0]} text={popData[1]} setVisible={setVisible} />
					:
					null
			}
			{
				login
					?
					<Redirect />
					:
					null
			}
			<section>
				<div id="logo">
					<svg viewBox="0 0 1944.3 512">
						<path
							fill="#DB9F2C"
							d="M512,176c0,97.2-78.8,176-176,176c-11.2,0-22.2-1.1-32.8-3.1l-24,27c-4.6,5.1-11.1,8.1-17.9,8.1H224v40
						c0,13.3-10.7,24-24,24h-40v40c0,13.3-10.7,24-24,24H24c-13.3,0-24-10.7-24-24v-78.1c0-6.4,2.5-12.5,7-17l161.8-161.8
						c-5.7-17.4-8.8-35.9-8.8-55.2C160,78.8,238.8,0,336,0C433.5,0,512,78.5,512,176z M336,128c0,26.5,21.5,48,48,48s48-21.5,48-48
						s-21.5-48-48-48S336,101.5,336,128z"
						/>
						<text
							fill="currentColor"
							transform="matrix(1 0 0 1 504.999 239.2998)"
						>
							<tspan x="0" y="0" className="st0 st1 st2">SAFE</tspan>
							<tspan x="0" y="218" className="st0 st1 st2">PASSWORD</tspan>
						</text>
					</svg>
				</div>
				<form onSubmit={onSubmit}>
					<h2>LOGIN</h2>
					<p>Welcome to your passwords administrator, login to use our services.</p>
					<input type="text" name="username" placeholder="Username" onChange={onChange} />
					<input type="password" name="password" placeholder="Password" onChange={onChange} />
					<button type="submit">Login</button>
					<span>
						Don't have an account?&nbsp;
						<Link to="/register">Go to register</Link>
					</span>
				</form>
			</section>

			<style jsx>{`

				.st0 {
					font-family: 'Segoe UI';
				}
				.st1 {
					font-size: 264.1624px;
				}
				.st2 {
					letter-spacing: 10;
				}
			
				.body {
					display: grid;
					height: 100vh;
					min-height: 600px;
					align-items: center;
				}

				section {
					display: grid;
					grid-template-rows: auto auto;
					grid-row-gap: 1rem;
				}


				h2 {
					text-align: center;
					font-weight: 600;
				}

				h2 {
					font-size: 1.5rem;
					color: white;
				}

				div {
					height: 3.5rem;
					cursor: pointer;
					margin: auto;
				}

				svg {
					color: white;
					height: 100%;
				}

				form {
					margin: 0 auto;
					width: 20rem;
					background-color: var(--main-color);
					align-self: flex-start;
					display: grid;
					place-items: center;
					padding: 2rem;
					border-radius: 1rem;
					row-gap: 2rem;
				}

				input {
					width: 70%;
					border: none;
					font-weight: 700;
					border-bottom: 3px solid white;
					background-color: unset;
					color: white;
					transition: padding .5s, margin .5s;
					margin: 7px;
				}

				input::placeholder {
					color: rgba(255, 255, 255, 0.418);
				}

				input:focus {
					margin: 0px;
					padding: 7px;
				}

				span, p {
					text-align: center;
					color: white;
				}

				a {
					display: inline-block;
					font-weight: 700;
					text-decoration: underline;
					color: #ffffffbb;
					text-align: center;
					transition: color .5s;
				}

				a:hover {
					color: white;
				}

				button {
					background-color: white;
					color: rgba(0, 0, 0, 0.658);
					font-weight: 600;
					display: block;
					padding: 5px 30px;
					border-radius: 1rem;
					transition: transform .5s;
				}

				button:hover {
					transform: scale(1.05);
				}

			
			`}</style>
		</div>
	)
}

export default Uno
