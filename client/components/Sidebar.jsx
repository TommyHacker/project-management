/** @format */

import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Sidebar = ({ user, setUser, notifications, setNotifications }) => {
	const router = useRouter();
	const [notificationCount, setNotificationCount] = useState(0);

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
				setUser(res.data.data);
				setNotifications(user.notifications);
				setNotificationCount(notifications.length);
				return;
			})
			.catch((err) => console.log(err));
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
						className='user-pog'
					>
						{user.fullName && user.fullName[0]}
					</div>
					<div className='section'>
						<div className='link-container'>
							<Link href={'/dashboard'}>Dashboard</Link>
						</div>
						<div className='notification-link-container'>
							<Link href={'/notifications'}>Notifications</Link>
							{notificationCount >= 1 && (
								<span className='notification-dot'>{notificationCount}</span>
							)}
						</div>
						<div className='link-container'>
							<Link href={'/myProjects'}>My Projects</Link>
						</div>
					</div>
					<div className='section'>
						{user.isAdmin && (
							<div className='link-container'>
								<Link href={'/allUsers'}>all users</Link>
							</div>
						)}
						<div className='link-container'>
							<Link href={'/support'}>support</Link>
						</div>
						<div className='link-container'>
							<Link href={'/community'}>community</Link>
						</div>
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
