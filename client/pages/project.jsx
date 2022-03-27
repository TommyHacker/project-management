/** @format */

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import DevsList from '../components/DevsList';
import TicketForm from '../components/TicketForm';
import Ticket from '../components/Ticket';

const Project = ({ user }) => {
	const [confirmDeletePrompt, setConfirmDeletePrompt] = useState(false);

	const [ticketForm, setTicketForm] = useState(false);

	const [status, setStatus] = useState();

	// NEXT USEROUTER FOR REDIRECTING
	const router = useRouter();

	//DEVLIST BUTTON STATE;
	const [addDevsList, setAddDevsList] = useState(false);

	//PROJECT STATE READY TO POPULATE PAGE
	const [project, setProject] = useState();

	// GETTING PROJECT _ID FROM URL PARAMS
	const { projectId } = router.query;

	// GET ALL DEVS TO ADD NEW DEVS TO PROJECT.ASSIGNED
	const getAllDevs = () => {
		axios
			.get('http://localhost:4000/user/all', { withCredentials: true })
			.then((res) => {
				setDevelopers(res.data.data);
			})
			.catch((err) => console.log(err));
	};

	// FUNCTION TO POPULATE THE PAGE WITH THE PROJECT DETAILS
	const getProject = () => {
		axios
			.get(`http://localhost:4000/project/one/${projectId}`, {
				withCredentials: true,
			})
			.then((res) => {
				setProject(res.data.data);
				// setDevsList();
			})
			.catch((err) => console.log(err));
	};

	// FUNCITON TO REMOVE ONE DEV ASSIGNED TO PROJECT.ASSIGNED STATE, NOT SENT AS PATCH UNTIL BUTTON (SAVE) CLICKED
	const removeDevHandler = (e) => {
		// DO NOT ALLOW LESS THAN 1 DEV
		if (project.assigned.length <= 1)
			return console.log('must be at least 1 dev available');

		//CREATE ARRAY COPY AND FILTER FOR SELECTED DEV
		const newAssigned = project.assigned.filter((dev) => {
			if (e != dev) return dev;
			return;
		});
		//UPDATE PROJECT.ASSIGNED ARRAY WITH TEMP ARRAY
		setProject({ ...project, assigned: newAssigned });
	};

	//SAVE => PATCH REQUEST TO SERVER THEN UPDATE PROJECT STATE FROM RESPONSE
	const saveProjectHandler = () => {
		axios
			.patch(
				'http://localhost:4000/project/',
				{
					id: project._id,
					status: status,
					assigned: project.assigned,
				},
				{ withCredentials: true }
			)
			.then((res) => setProject(res.data.data))
			.catch((err) => console.log(err));
		return;
	};

	const deleteProjectHandler = (id) => {
		const url = 'http://localhost:4000/project/';
		const data = { id };
		axios
			.delete(url, { withCredentials: true, data })
			.then((res) => consle.log(res))
			.catch((err) => console.log(err));
		return router.replace('/myProjects');
	};

	// USED TO AUTOMATICALLY POPULATE PROJECT DETAILS FROM SERVER BASED ON PARAMS
	useEffect(() => {
		//IF PROJECT ALREADY POPULATED, RETURN
		if (project) return;
		//OTHERWISE REQ PROJECT
		return getProject();
	}, []);

	return (
		<div className='page-container'>
			<h1 className='title'>Project</h1>
			{/* BACK TO ALL PROJECTS */}
			<button
				onClick={() => router.replace('/myProjects')}
				className='back-btn btn'
			>
				Back
			</button>

			{/* IF PROJECT HAS BEEN POPULATED ... */}
			{project && (
				<>
					<div className='body'>
						<h1>{project.title}</h1>
						{/* CURRENT STATUS AND ASSIGNED */}
						<div className='grid'>
							{/* STATUS */}
							<div className='project-page-section small'>
								<h4 style={{ textTransform: 'capitalize' }}>
									Current Status: {project.status}
								</h4>
								{user && user.isAdmin && (
									<select onChange={(e) => setStatus(e.target.value)}>
										<option value={project.status}>default</option>
										<option value='in-progress'>in-progress</option>
										<option value='testing'>testing</option>
										<option value='deployment'>deployment</option>
										<option value='complete'>complete</option>
									</select>
								)}
							</div>

							{/* ASSIGNED */}
							<div className='project-page-section'>
								<h4>assigned:</h4>
								<div className='assigned-list'>
									{project &&
										project.assigned &&
										project.assigned.map((dev, index) => {
											return (
												<div key={index}>
													{/* IF MORE THAN 1 ASSIGNEE LEFT, RENDER REMOVE DEV BUTTON */}
													{project &&
													user &&
													project.assigned.length >= 2 &&
													user.isAdmin ? (
														<h4
															className='dev-remove'
															onClick={() => removeDevHandler(dev)}
														>
															{dev}
														</h4>
													) : (
														<h4 className='dev-handle'>{dev},</h4>
													)}
												</div>
											);
										})}
								</div>
								{user && user.isAdmin && (
									<button onClick={() => setAddDevsList(!addDevsList)}>
										+
									</button>
								)}
								{addDevsList && user && user.isAdmin && (
									<DevsList
										project={project}
										setProject={setProject}
										assigned={project.assigned}
										addDevsList={addDevsList}
										setAddDevsList={setAddDevsList}
									/>
								)}
							</div>
						</div>

						{/* PROJECT DATES */}
						<div className='project-page-section'>
							<h4>
								Project Created:{' '}
								{project.createdAt && project.createdAt.slice(0, 10)}
							</h4>
							<h4>
								Project last updated:{' '}
								{project.updatedAt && project.updatedAt.slice(0, 10)}
							</h4>
						</div>

						{/* PROJECT TICKETS */}
						<div className='ticket-section'>
							<h1>Tickets: {project.tickets && project.tickets.length}</h1>
							<h4>
								resolved:{' '}
								{project.tickets &&
									project.tickets.filter((t) => t.resolved).length}
							</h4>
							<h4>
								active:{' '}
								{project.tickets &&
									project.tickets.filter((t) => !t.resolved).length}
							</h4>
							<button
								onClick={() => setTicketForm(!ticketForm)}
								className='btn'
							>
								+ Post Ticket
							</button>
						</div>
						<div className='tickets-grid'>
							<h1 style={{ marginTop: '4rem' }} className='title'>
								active
							</h1>
							{project.tickets &&
								project.tickets.map((ticket) => {
									if (!ticket.resolved)
										return (
											<div className='active-ticket'>
												<Ticket
													key={ticket._id}
													ticket={ticket}
													projectId={project._id}
													project={project}
													setProject={setProject}
												/>
											</div>
										);
								})}
							<h1 style={{ marginTop: '4rem' }} className='title'>
								Resolved
							</h1>
							{project.tickets &&
								project.tickets.map((ticket) => {
									if (ticket.resolved)
										return (
											<div className='inactive-ticket'>
												<Ticket
													key={ticket._id}
													ticket={ticket}
													projectId={project._id}
													project={project}
													setProject={setProject}
												/>
											</div>
										);
								})}
						</div>
						{ticketForm && (
							<TicketForm
								project={project}
								setProject={setProject}
								setTicketForm={setTicketForm}
								projectId={project._id}
							/>
						)}
						<h4 style={{ color: 'grey' }}>{project._id}</h4>
						{/* SAVE PROJECT BY SENDING PATCH DATA TO SERVER */}
						{user && user.isAdmin && (
							<button
								className='save-btn btn'
								onClick={() => saveProjectHandler()}
							>
								save
							</button>
						)}
						{/* DELETE PROJECT ADMIN ONLY */}
						<div className='delete-btn-container'>
							{user && user.isAdmin && (
								<>
									{confirmDeletePrompt && (
										<div className='delete-project-prompt'>
											<h4>
												Are you sure you want to permanently remove project and
												all content?
											</h4>
											<div className='section'>
												<button
													className='btn delete-btn'
													onClick={() => deleteProjectHandler(project._id)}
												>
													Confirm
												</button>
												<button
													className='btn delete-btn'
													onClick={() => setConfirmDeletePrompt(false)}
												>
													Cancel
												</button>
											</div>
										</div>
									)}
									{!confirmDeletePrompt && (
										<button
											onClick={() => setConfirmDeletePrompt(true)}
											className='btn delete-btn'
										>
											Delete Project
										</button>
									)}
								</>
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Project;
