import React from 'react'
import Nav from '../components/Nav.jsx'
import TagManage from '../components/TagManage';
import Auth from '../components/Auth'

const Tag = () => {
	return (
		<div>
			<Auth />
			<Nav />
			<TagManage />
		</div>
	)
}

export default Tag
