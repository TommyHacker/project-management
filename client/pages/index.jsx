/** @format */

import axios from 'axios';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const Index = () => {
	const { user, setUser } = useContext(UserContext);

	return (
		<div className='page-container'>
			<h1>Welcome to project management.</h1>
			<div className='body'>
				{!user && (
					<p style={{ textAlign: 'center' }}>
						please <Link href={'/register'}>Register</Link> or{' '}
						<Link href={'/login'}>Log in</Link> to use the platform.
					</p>
				)}
				{user && (
					<h1
						style={{
							textTransform: 'capitalize',
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						{user.fullName}
					</h1>
				)}
			</div>
		</div>
	);
};
export default Index;
