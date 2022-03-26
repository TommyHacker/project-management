/** @format */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Register = () => {
	const { user, setUser } = useContext(UserContext);
	useEffect(() => {
		if (user) return router.push('/');
	}, [user]);

	const router = useRouter();
	const [fullName, setFullName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const submitHandler = (e) => {
		e.preventDefault();
		axios
			.post(
				'http://localhost:4000/user/register',
				{ fullName, email, password },
				{ withCredentials: true }
			)
			.then((res) => {
				setUser(res.data.data);
			})
			.catch((err) => console.log(err));
		setFullName('');
		setEmail('');
		setPassword('');
	};

	return (
		<div className='page-container'>
			<form className='user-form' onSubmit={(e) => submitHandler(e)}>
				<div className='title'>Register.</div>

				<div className='section'>
					<label htmlFor='fullName'>Full Name</label>
					<input
						type='text'
						name='fullName'
						onChange={(e) => setFullName(e.target.value)}
					/>
				</div>
				<div className='section'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						name='email'
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='section'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						name='password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<button>Register</button>
				<p>
					Already have an account? <Link href={'/login'}>Log in</Link> here.
				</p>
			</form>
		</div>
	);
};

export default Register;
