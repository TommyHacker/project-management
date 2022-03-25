/** @format */

import axios from 'axios';
import { useState } from 'react';
const TicketForm = ({ projectId, setTicketForm, project, setProject }) => {
	const [title, setTitle] = useState();
	const [info, setInfo] = useState();
	const [severity, setSeverity] = useState();

	const ticketSubmitHandler = (e) => {
		e.preventDefault();
		axios
			.post(
				'http://localhost:4000/project/ticket',
				{ id: projectId, title, info, severity },
				{ withCredentials: true }
			)
			.then((res) => setProject({ ...project, tickets: res.data.data }))
			.catch((err) => console.log(err));
		setTitle('');
		setInfo('');
		setSeverity();
		setTicketForm(false);
	};
	return (
		<div className='ticket-form-container'>
			<div className='title-section'>
				<h1 className='title'>ticket form</h1>
				<button
					onClick={() => setTicketForm(false)}
					className='btn'
					style={{ fontSize: '14pt' }}>
					x
				</button>
			</div>
			<p className='project-id'>{projectId}</p>
			<form onSubmit={(e) => ticketSubmitHandler(e)} className='ticket-form'>
				<div className='section'>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						placeholder='title'
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className='section'>
					<label htmlFor='info'>Info</label>
					<input
						type='text'
						placeholder='info'
						onChange={(e) => setInfo(e.target.value)}
					/>
				</div>
				<div className='section'>
					<label htmlFor='severity'>Severity 0-3</label>
					<input
						type='number'
						name='severity'
						onChange={(e) => setSeverity(e.target.value)}
					/>
				</div>
				<button type='submit' className='btn'>
					Submit Ticket
				</button>
			</form>
		</div>
	);
};

export default TicketForm;
