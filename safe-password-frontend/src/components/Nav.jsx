import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'

const Nav = () => {

	const [logout, setLogout] = useState(false)
	const [name, setName] = useState('')

	useEffect(() => {
		setName(localStorage.getItem('name'))
	}, [])

	const logoutHandle = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('_id')
		setLogout(true)
	}

	return (
		<nav>
			{
				logout
					?
					<Redirect to="/login" />
					:
					null
			}
			<ul>
				<li onClick={() => window.location = '/'}>
					<svg className="logo" viewBox="0 0 1944.3 512" >
						<path fill="currentColor" d="M512,176c0,97.2-78.8,176-176,176c-11.2,0-22.2-1.1-32.8-3.1l-24,27c-4.6,5.1-11.1,8.1-17.9,8.1H224v40
                        c0,13.3-10.7,24-24,24h-40v40c0,13.3-10.7,24-24,24H24c-13.3,0-24-10.7-24-24v-78.1c0-6.4,2.5-12.5,7-17l161.8-161.8
                        c-5.7-17.4-8.8-35.9-8.8-55.2C160,78.8,238.8,0,336,0C433.5,0,512,78.5,512,176z M336,128c0,26.5,21.5,48,48,48s48-21.5,48-48
                        s-21.5-48-48-48S336,101.5,336,128z"/>
						<text fill="currentColor" transform="matrix(1 0 0 1 504.999 239.2998)"><tspan x="0" y="0" className="st0 st1 st2">SAFE</tspan><tspan x="0" y="218" className="st0 st1 st2">PASSWORD</tspan></text>
					</svg>
				</li>
				<li>
					<Link to="/">
						<button id="nav-item" className="button-nav">PASSWORDS</button>
					</Link>
				</li>
				<li>
					<Link to="/tag">
						<button id="nav-tag" className="button-nav">TAGS</button>
					</Link>
				</li>
				<li className="user">
					<svg className="user-icon" viewBox="0 0 448 512">
						<path fill="currentColor" d="M383.9 308.3l23.9-62.6c4-10.5-3.7-21.7-15-21.7h-58.5c11-18.9 17.8-40.6 17.8-64v-.3c39.2-7.8 64-19.1 64-31.7 0-13.3-27.3-25.1-70.1-33-9.2-32.8-27-65.8-40.6-82.8-9.5-11.9-25.9-15.6-39.5-8.8l-27.6 13.8c-9 4.5-19.6 4.5-28.6 0L182.1 3.4c-13.6-6.8-30-3.1-39.5 8.8-13.5 17-31.4 50-40.6 82.8-42.7 7.9-70 19.7-70 33 0 12.6 24.8 23.9 64 31.7v.3c0 23.4 6.8 45.1 17.8 64H56.3c-11.5 0-19.2 11.7-14.7 22.3l25.8 60.2C27.3 329.8 0 372.7 0 422.4v44.8C0 491.9 20.1 512 44.8 512h358.4c24.7 0 44.8-20.1 44.8-44.8v-44.8c0-48.4-25.8-90.4-64.1-114.1zM176 480l-41.6-192 49.6 32 24 40-32 120zm96 0l-32-120 24-40 49.6-32L272 480zm41.7-298.5c-3.9 11.9-7 24.6-16.5 33.4-10.1 9.3-48 22.4-64-25-2.8-8.4-15.4-8.4-18.3 0-17 50.2-56 32.4-64 25-9.5-8.8-12.7-21.5-16.5-33.4-.8-2.5-6.3-5.7-6.3-5.8v-10.8c28.3 3.6 61 5.8 96 5.8s67.7-2.1 96-5.8v10.8c-.1.1-5.6 3.2-6.4 5.8z" />
					</svg>
					<h1 id="title">{name}</h1>
					<button onClick={logoutHandle} id="logout" className="button-nav logout">LOGOUT</button>
				</li>

			</ul>
			<style jsx>{`
			
				.st0{font-family:'Segoe UI';}
				.st1{font-size:264.1624px;}
				.st2{letter-spacing:10;}
				
				nav ul {
					display: flex;
					justify-content: space-around;
					align-items: center;
					padding: 10px 50px;
					margin-bottom: 30px;
					background-color: var(--main-color);
				}

				.logo {
					height: 3rem;
					color: white;
					cursor: pointer;
				}

				.button-nav {
					background-color: unset;
					color: white;
					font-weight: 700;
					transition: border-bottom 0.2s, margin-bottom 0.2s;
				}

				.button-nav:hover {
					margin-bottom: -3px;
					border-bottom: 3px solid white;
				}

				.bottom-border {
					border-bottom: 3px solid white;
				}

				.user {
					display: grid;
					grid-template-columns: auto 1fr;
					grid-template-rows: 1fr 1fr;
					column-gap: 0.5rem;
				}

				.user svg {
					grid-row: 1/3;
				}

				.user h1 {
					text-transform: uppercase;
					font-weight: 800;
					color: white;
				}

				.user-icon {
					height: 2.5rem;
					color: white;
				}

				.logout {
					display: inline-block;
					justify-self: center;
				}

				.tag-list-in-item p {
					font-weight: 700;
				}

				.tag-list-in-item li {
					position: relative;
					margin-left: 25px;
					margin-top: 10px;
				}

				.tag-list-in-item li:before {
					content: "";
					position: absolute;
					height: 8px;
					width: 8px;
					background: white;
					top: 40%;
					border-radius: 50%;
					left: -14px;
				}

			`}</style>
		</nav>
	)
}

export default Nav
