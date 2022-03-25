/** @format */

import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

const CommentForm = ({ projectId, ticketId, project, setProject }) => {
	const [content, setContent] = useState();
	const router = useRouter();

	const submitCommentHandler = (e) => {
		e.stopPropagation();
		e.preventDefault();
		console.log(e.target.content.value);
		axios
			.post(
				'http://localhost:4000/project/ticket/comment',
				{ content, projectId, ticketId },
				{ withCredentials: true }
			)
			.then((res) => setProject(res.data.data))
			.catch((err) => console.log(err));
		e.target.content.value = '';
		setContent();

		return;
	};

	return (
		<div className='comment-form-container'>
			<form className='comment-form' onSubmit={(e) => submitCommentHandler(e)}>
				<div className='section'>
					<label htmlFor='content'>Comment:</label>
					<input
						onClick={(e) => e.stopPropagation()}
						type='text'
						name='content'
						autoComplete='off'
						min={10}
						onChange={(e) => setContent(e.target.value)}
					/>
				</div>
				<button onClick={(e) => e.stopPropagation()} className='btn'>
					Send
				</button>
			</form>
		</div>
	);
};

export default CommentForm;
