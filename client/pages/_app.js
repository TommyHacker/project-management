/** @format */
import Navbar from '../components/Navbar';
import '../styles/css/main.css';
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useContext } from 'react';

const MyApp = ({ Component, pageProps }) => {
	const [user, setUser] = useState();
	return (
		<>
			<UserContext.Provider value={{ user, setUser }}>
				<Sidebar />
				<Component {...pageProps} />
			</UserContext.Provider>
		</>
	);
};

export default MyApp;
