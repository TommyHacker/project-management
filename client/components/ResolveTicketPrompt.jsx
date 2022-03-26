import axios from 'axios';
import { useRouter } from 'next/router';
const ResolveTicketPrompt = ({
	resolveTicketPrompt,
	setResolveTicketPrompt,
	projectId,
	ticket,
	setProject,
}) => {
	const router = useRouter();

	const resolveTicketHandler = () => {
		axios
			.patch(
				'http://localhost:4000/project/ticket',
				{ projectId, ticketId: ticket._id, resolved: !ticket.resolved },
				{ withCredentials: true }
			)
			.then((res) => setProject(res.data.data))
			.catch((err) => console.log(err));
		setResolveTicketPrompt(false);
	};
	return (
		<div
			key={ticket._id}
			onClick={(e) => e.stopPropagation()}
			className='resolve-ticket-container'
		>
			<div className='resolve-ticket-prompt'>
				<h4>Mark ticket as {ticket.resolved ? 'unresolved' : 'resolved'}</h4>
				<h4>current : {ticket.resolved.toString()}</h4>
				<h5>Are you sure?</h5>
				<button
					className='btn'
					onClick={(e) => {
						resolveTicketHandler();
					}}
				>
					Confirm
				</button>
				<button
					className='btn'
					onClick={(e) => {
						setResolveTicketPrompt(false);
					}}
				>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default ResolveTicketPrompt;
