/** @format */

import { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { useRouter } from 'next/router';
import NewProjectForm from '../components/NewProjectForm';

const MyProjects = () => {
	const router = useRouter();
	const { user, setUser } = useContext(UserContext);
	const [projects, setProjects] = useState();
	const [newProjectForm, setNewProjectForm] = useState(false);

	const getProjects = () => {
		axios
			.get('http://localhost:4000/project/all', { withCredentials: true })
			.then((res) => setProjects(res.data.data))
			.catch((err) => console.log(err));
	};

	const getProjectPageHandler = (projectId) => {
		router.push({ pathname: '/project', query: { projectId } });
	};

	useEffect(() => {
		if (!projects) return getProjects();
		return;
	}, []);

	return (
		<div className='page-container'>
			<h1>Projects</h1>
			<div className='body'>
				{user && user.isAdmin && (
					<button
						onClick={() => setNewProjectForm(!newProjectForm)}
						className='btn save-btn'>
						New Project
					</button>
				)}
				{user && user.isAdmin && newProjectForm && (
					<NewProjectForm projects={projects} setProjects={setProjects} />
				)}
				<div className='projects-container'>
					{projects &&
						projects.map((project) => {
							return (
								<div
									onClick={() => getProjectPageHandler(project._id)}
									className='project-card'
									key={project._id}>
									<div className='project-header'>
										<h4 style={{ textTransform: 'none' }}>{project.title}</h4>
										<p>
											created:{' '}
											{project.createdAt
												? project.createdAt.slice(0, 10)
												: 'just now.'}
										</p>
									</div>
									<div className='project-update'>
										<div className='project-assigned-list'>
											<h4>assigned:</h4>
											{project.assigned
												? project.assigned.map((dev, index) => {
														return <p key={index}>{dev},</p>;
												  })
												: ''}
										</div>
										<h4>
											tickets: {project.tickets && project.tickets.length}
										</h4>
										<h4>Status: {project.status}</h4>
										<p>
											last update:{' '}
											{project.updatedAt
												? project.updatedAt.slice(0, 10)
												: 'just now.'}
										</p>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default MyProjects;