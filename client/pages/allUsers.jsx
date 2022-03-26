/** @format */
import axios from 'axios';
import { useState, useEffect } from 'react';

const AllUsers = () => {
	//list of all users on platform
	const [users, setUsers] = useState();
	//get users from server.
	const getUsersHandler = () => {
		axios
			.get('http://localhost:4000/user/all', { withCredentials: true })
			.then((res) => setUsers(res.data.data))
			.catch((err) => console.log(err));
		return;
	};

	const isAdminHandler = (e, id) => {
		const isAdmin = e.target.value;
		axios
			.patch(
				'http://localhost:4000/user/isadmin',
				{ isAdmin, id },
				{ withCredentials: true }
			)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};
	const isDeveloperHandler = (e, id) => {
		const isDeveloper = e.target.value;
		axios
			.patch(
				'http://localhost:4000/user/isDeveloper',
				{ isDeveloper, id },
				{ withCredentials: true }
			)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	const deleteUserHandler = async (userId) => {
		const data = { userId };
		await axios
			.delete('http://localhost:4000/user/deleteuser', {
				withCredentials: true,
				data,
			})
			.then((res) => {
				setUsers(res.data.data);
			})
			.catch((err) => console.log(err));
	};

	// get users on pageload.
	useEffect(() => {
		if (!users) return getUsersHandler();
	}, []);

	return (
		<div className='page-container'>
			<h1>All Users</h1>
			<div className='body'>
				<div className='allusers-container'>
					{users &&
						users.map((user) => {
							return (
								<div className='user-card' key={user._id}>
									<h4 className='user-title'>{user.fullName}</h4>
									<div className='user-section'>
										<h4>{user.email}</h4>
									</div>
									<div className='user-section'>
										<div className='control'>
											<h4>is Developer</h4>
											{user && user.fullName !== 'admin' && (
												<select
													name='isDeveloper'
													onChange={(e) => isDeveloperHandler(e, user._id)}
												>
													{user && user.isDeveloper ? (
														<>
															<option selected value='true'>
																true
															</option>
															<option value='false'>false</option>
														</>
													) : (
														<>
															<option value='true'>true</option>
															<option selected value='false'>
																false
															</option>
														</>
													)}
												</select>
											)}
										</div>
										<div className='control'>
											<h4>is admin</h4>
											{user.fullName != 'admin' ? (
												<select
													onChange={(e) => isAdminHandler(e, user._id)}
													name='isAdmin'
												>
													{user && user.isAdmin ? (
														<>
															<option selected value='true'>
																true
															</option>
															<option value='false'>false</option>
														</>
													) : (
														<>
															<option value='true'>true</option>
															<option selected value='false'>
																false
															</option>
														</>
													)}
												</select>
											) : (
												''
											)}
											<button
												onClick={() => deleteUserHandler(user._id)}
												className='btn'
											>
												Delete User
											</button>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default AllUsers;
