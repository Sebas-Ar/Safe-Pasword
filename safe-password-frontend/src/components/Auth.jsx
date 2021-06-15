import axios from 'axios';
import React, { useEffect } from 'react'

const Auth = () => {

	useEffect(() => {
		getAuth()
	}, []);

	const getAuth = async () => {

		const token = localStorage.getItem('token')
		console.log(token)
		if (token) {
			const url = `http://localhost:3000/user/${token}`

			try {
				const response = await axios.get(url)
				if (!response.data.auth) window.location = '/#/login'
			} catch (error) {
				window.location = '/#/login'
			}
		} else {
			window.location = '/#/login'
		}

	}

	return <></>
}

export default Auth
