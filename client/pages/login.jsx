/** @format */
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
const Login = ({ user, setUser }) => {
	//prepare useRouter to redirect on user = true;
	const router = useRouter();

	//setState for form inputs
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	// check if user already logged in
	useEffect(() => {
		if (user) return router.push('/');
	});

	// submit log in form
	const submitHandler = (e) => {
		e.preventDefault();
		axios
			.post(
				'http://localhost:4000/user/login',
				{ email, password },
				{ withCredentials: true }
			)
			.then((res) => {
				if (res.data.status === 'success') return setUser(res.data.data);
			})
			.catch((err) => console.log(err));
		setEmail('');
		setPassword('');
		return router.replace('/');
	};

	return (
		<div className='page-container'>
			<form className='user-form' onSubmit={(e) => submitHandler(e)}>
				<div className='title'>Login.</div>
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
				<button>Log In</button>
				<p>
					Don't have an account? <Link href={'/register'}>register</Link> here.
				</p>
			</form>
		</div>
	);
};

export default Login;
