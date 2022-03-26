/** @format */

import axios from 'axios';
import { useState } from 'react';

const Profile = ({ user }) => {
	const [message, setMessage] = useState();
	const deleteUserHandler = () => {
		axios
			.delete('http://localhost:4000/user', { withCredentials: true })
			.then((res) => setMessage(res.data.message))
			.catch((err) => console.log(err));
	};

	return (
		<div className='page-container'>
			<h1 style={{ textTransform: 'capitalize' }}>Profile: {user}</h1>
			{message && <h4>{message}</h4>}
			<button onClick={() => deleteUserHandler()} className='btn'>
				Delete Account
			</button>
		</div>
	);
};

export default Profile;
