/** @format */

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import NewProjectForm from '../components/NewProjectForm';

const MyProjects = ({ user, setUser }) => {
	const router = useRouter();
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
		return getProjects();
	}, []);

	return (
		<div className='page-container'>
			<h1>Projects</h1>
			<div className='body'>
				{user && user.isAdmin && (
					<button
						onClick={() => setNewProjectForm(!newProjectForm)}
						className='btn save-btn'
					>
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
									key={project._id}
								>
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
										<h4>
											active:{' '}
											{project.tickets &&
												project.tickets.filter((t) => !t.resolved).length}
										</h4>
										<h4>
											resolved:{' '}
											{project.tickets &&
												project.tickets.filter((t) => t.resolved).length}
										</h4>
										<h4>Status: {project.status}</h4>
										<p>
											last update:{' '}
											{project.updatedAt
												? project.updatedAt.slice(0, 10)
												: 'just now.'}
										</p>
									</div>

									{project.tickets &&
										project.tickets.map((ticket, index) => {
											if (index === project.tickets.length - 1)
												return (
													<h4 className='recent-ticket'>
														recent ticket: {ticket.title}
													</h4>
												);
										})}
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default MyProjects;
