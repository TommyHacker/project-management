/** @format */

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
const NewProjectForm = ({ projects, setProjects }) => {
	const router = useRouter();
	const [title, setTitle] = useState();
	const [assigned, setAssigned] = useState();

	const createProjectHandler = (e) => {
		e.preventDefault();
		axios
			.post(
				'http://localhost:4000/project',
				{ title, assigned },
				{ withCredentials: true }
			)
			.then((res) => setProjects(res.data.data))
			.catch((err) => console.log(err));
		setTitle('');
		setAssigned('');
		e.target.title.value = '';
		// e.target.assigned.value = '';
		router.replace('/myProjects');
	};

	return (
		<div className='new-project-form-container'>
			<h1>New Project</h1>
			<form
				onSubmit={(e) => createProjectHandler(e)}
				className='new-project-form'>
				<input
					type='text'
					placeholder='title'
					name='title'
					onChange={(e) => setTitle(e.target.value)}
				/>
				<button type='submit'>Create Project</button>
			</form>
		</div>
	);
};

export default NewProjectForm;
