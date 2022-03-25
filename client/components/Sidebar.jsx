/** @format */

import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const Sidebar = () => {
	const { user, setUser } = useContext(UserContext);
	const [count, setCount] = useState(0);
	const [notificationCount, setNotificationCount] = useState(0);
	const router = useRouter();

	const redirectHome = () => {
		router.push('/');
	};

	const profileRouteHandler = () => {
		return router.push('/profile');
	};

	const getUser = () => {
		if (user) return;
		axios
			.get('http://localhost:4000/user', { withCredentials: true })
			.then((res) => {
				return setUser(res.data.data);
			})
			.catch((err) => console.log(err));
		setNotificationCount();
	};

	const unreadNotificationCalc = () => {
		let count = 0;
		user &&
			user.notifications.filter((n) => {
				if (!n.seen) return (count += 1);
				return;
			});
		setNotificationCount(count);
	};

	const logoutHandler = (e) => {
		e.preventDefault();
		router.replace('/');
		axios
			.delete('http://localhost:4000/user/logout', { withCredentials: true })
			.then((res) => setUser(null))
			.catch((err) => console.log(err));
	};

	useEffect(async () => {
		if (!user) {
			getUser();
			return unreadNotificationCalc();
		}
		unreadNotificationCalc();
		return;
	});

	return (
		<div className='side-bar'>
			<h2 className='title' onClick={() => redirectHome()}>
				ProjectTracker
			</h2>
			{user ? (
				<>
					<div
						onClick={() => profileRouteHandler()}
						style={{ textTransform: 'capitalize' }}
						className='user-pog'>
						{user.fullName && user.fullName[0]}
					</div>
					<div className='section'>
						<Link href={'/dashboard'}>Dashboard</Link>

						<Link href={'/notifications'}>Notifications</Link>
						{user.notifications && notificationCount >= 1 && (
							<div className='notification-dot'>{notificationCount}</div>
						)}
						<Link href={'/myProjects'}>My Projects</Link>
					</div>
					<div className='section'>
						{user.isAdmin && <Link href={'/allUsers'}>all users</Link>}
						<Link href={'/support'}>support</Link>
						<Link href={'/community'}>community</Link>
					</div>
					<button className='logout-btn' onClick={(e) => logoutHandler(e)}>
						logout
					</button>
				</>
			) : (
				<>
					<Link href={'/help'}>Project Overview</Link>
					<Link href={'/gettingstarted'}>Getting started</Link>
				</>
			)}
		</div>
	);
};

export default Sidebar;