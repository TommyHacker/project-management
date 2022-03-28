/** @format */

import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import CommentForm from './CommentForm';
import ResolveTicketPrompt from './ResolveTicketPrompt';
import TicketUpdateForm from './TicketUpdateForm';

const Ticket = ({ ticket, projectId, project, setProject }) => {
	const ticketRef = useRef(null);

	const [expanded, setExpanded] = useState(false);
	const [commentFormView, setCommentFormView] = useState(true);
	// { setCommentFormView, projectId, ticketId }

	const [resolveTicketPrompt, setResolveTicketPrompt] = useState(false);

	const ticketExpandHandler = () => {
		setExpanded(!expanded);
		ticketRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	const ticketUpdateFormHandler = (e) => {
		//stops the parent div effects from event bubbling... doesnt retract the div on click.
		e.stopPropagation();
		setTicketUpdateForm(!ticketUpdateForm);
	};

	const resolveTicketHandler = (e) => {
		e.preventDefault();
		axios
			.patch(
				'http://localhost:4000/project/ticket',
				{ projectId, ticketId: ticket._id, resolved: !ticket.resolved },
				{ withCredentials: true }
			)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	};

	return (
		<div
			key={ticket._id}
			ref={ticketRef}
			onClick={() => ticketExpandHandler()}
			className={
				expanded
					? 'ticket-card ticket-card-expanded'
					: 'ticket-card ticket-card-retracted'
			}
		>
			{resolveTicketPrompt && (
				<ResolveTicketPrompt
					key={ticket._id}
					projectId={projectId}
					ticket={ticket}
					setProject={setProject}
					project={project}
					resolveTicketPrompt={resolveTicketPrompt}
					setResolveTicketPrompt={setResolveTicketPrompt}
				/>
			)}
			<div className='ticket-section-title'>
				<h4>Ticket: {ticket.title}</h4>
				<h4>Submitted by: {ticket.author}</h4>
			</div>
			<div className='ticket-section'>
				<h3>Info:</h3>
				<p className='ticket-info'>
					{!expanded ? `${ticket.info.slice(0, 180)}...` : ticket.info}
				</p>
			</div>
			{ticket && expanded && (
				<>
					<div className='ticket-section'>
						<h4>Created: {ticket.createdAt.slice(0, 10)}</h4>
						<h4>Updated: {ticket.updatedAt.slice(0, 10)}</h4>
					</div>
					<div className='ticket-section'>
						<h4>Updates:</h4>
						<h3>severity: {ticket.severity}</h3>
						<h3>resolved : {ticket.resolved ? 'yes' : 'no'}</h3>
						<button
							onClick={(e) => {
								e.stopPropagation();
								setResolveTicketPrompt(true);
							}}
							className='btn'
							style={{ fontSize: '14pt', zIndex: '100' }}
						>
							Update Ticket
						</button>
					</div>
					<div
						onClick={(e) => e.stopPropagation()}
						className='ticket-controller'
					>
						<div
							className='comments-container'
							onClick={(e) => e.stopPropagation()}
						>
							<div className='comments-overlay'>
								{commentFormView && (
									<CommentForm
										ticket={ticket}
										project={project}
										setProject={setProject}
										commentFormView={commentFormView}
										setCommentFormView={setCommentFormView}
										projectId={projectId}
										ticketId={ticket._id}
									/>
								)}
								<div>
									{ticket.comments &&
										ticket.comments.map((comment, index) => {
											return (
												<div
													className={
														ticket && ticket.author === comment.author
															? 'comments comments-author'
															: 'comments comments-dev'
													}
												>
													<p key={comment._id}>
														<span className='comment-author-span'>
															{comment.author}:
														</span>
														{comment.content}
													</p>
												</div>
											);
										})}
								</div>
							</div>
						</div>
						<div
							className='ticket-actions'
							onClick={(e) => e.stopPropagation()}
						>
							<div>
								<div className='ticket-updates-header'>
									<h2>
										Status: {ticket.resolved ? 'Resolved.' : 'In progress'}
									</h2>
									<h2>updates: {ticket.updates.length}</h2>
								</div>
								<div className='updates-section section'>
									{ticket.updates &&
										ticket.updates.map((update, index) => {
											return (
												<div key={update._id} className='ticket-update'>
													<h4 className='ticket-update-author'>
														{update.author}
													</h4>
													<h4 className='ticket-update-content'>
														{update.content}
													</h4>
												</div>
											);
										})}
								</div>
								<div className='section'>
									{ticket && (
										<TicketUpdateForm
											ticket={ticket}
											project={project}
											setProject={setProject}
											projectId={projectId}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Ticket;
