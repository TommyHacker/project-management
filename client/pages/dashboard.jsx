/** @format */
import { UserContext } from '../context/UserContext';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
	const { user, setUser } = useContext(UserContext);
	const [userData, setUserData] = useState();
	const [projectsListed, setProjectsListed] = useState(false);
	const [ticketsListed, setTicketsListed] = useState(false);

	const getUserStats = () => {
		console.log('getting user stats');
		axios
			.get('http://localhost:4000/project/dashboardConfession', {
				withCredentials: true,
			})
			.then((res) => setUserData(res.data.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		if (!userData) return getUserStats();
		return;
	}, [userData]);

	const expandTicketsHandler = () => {
		setTicketsListed(!ticketsListed);
	};
	const expandProjectsHandler = () => {
		setProjectsListed(!projectsListed);
	};

	return (
		<div className='page-container'>
			<h1>Dashboard</h1>
			<div className='body'>
				<h2 className='fadefromred' onClick={() => expandTicketsHandler()}>
					Tickets : {userData && userData.ticketsCount.length}
				</h2>
				{ticketsListed &&
					userData.ticketsCount.map((t, i) => {
						return <p key={i}>{t.title}</p>;
					})}
				<h2 className='fadefromred' onClick={() => expandProjectsHandler()}>
					Projects : {userData && userData.projectsCount.length}
				</h2>
				{projectsListed &&
					userData.projectsCount.map((p, i) => {
						return <p key={i}>{p.title}</p>;
					})}
				{user && (
					<>
						<h1 style={{ textTransform: 'capitalize' }}>{user.fullName}</h1>
						<p>{user.email}</p>
					</>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
