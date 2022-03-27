/** @format */
import '../styles/css/main.css';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';

const MyApp = ({ Component, pageProps }) => {
	const [user, setUser] = useState();
	const [notifications, setNotifications] = useState(null);
	return (
		<>
			<Sidebar
				user={user}
				setUser={setUser}
				notifications={notifications}
				setNotifications={setNotifications}
			/>
			<Component
				user={user}
				setUser={setUser}
				notifications={notifications}
				setNotifications={setNotifications}
				{...pageProps}
			/>
		</>
	);
};

export default MyApp;
