/** @format */

import axios from 'axios';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const TicketUpdateForm = ({ ticket, projectId, setProject }) => {
	const { user } = useContext(UserContext);

	const [content, setContent] = useState();

	const ticketUpdateHandler = (e) => {
		e.stopPropagation();
		e.preventDefault();
		const ticketId = ticket._id;
		axios
			.post(
				'http://localhost:4000/project/ticket/updates',
				{ projectId, ticketId, content },
				{ withCredentials: true }
			)
			.then((res) => setProject(res.data.data))
			.catch((err) => console.log(err));
	};

	return (
		<>
			{ticket && !ticket.resolved && (
				<div className='ticket-update-form-container'>
					<form
						onSubmit={(e) => ticketUpdateHandler(e)}
						className='ticket-update-form'
					>
						<div className='section'>
							<label htmlFor='updateContent'>Update</label>
							<input
								autoComplete='off'
								type='text'
								name='updateContent'
								placeholder='update content'
								onChange={(e) => setContent(e.target.value)}
							/>
						</div>
						<button className='btn'>Submit Update</button>
					</form>
				</div>
			)}{' '}
		</>
	);
};

export default TicketUpdateForm;
