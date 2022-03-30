/** @format */

const mongoose = require('mongoose');
const Project = require('../models/projectSchema');
const User = require('../models/userSchema');
const { createNotification } = require('../helpers/notificationHelpers');

exports.create = async (req, res) => {
	try {
		const { id, title, info, severity } = req.body;
		const author = res.locals.currentUser.fullName;
		const project = await Project.findById(id);
		project.tickets = [...project.tickets, { author, title, info, severity }];
		await project.save();
		project.assigned.map(async (e) => {
			const user = await User.findOne({ fullName: e });
			await createNotification(
				user._id,
				`new ticket: ${title} added to one of your projects: ${project.title}`,
				1
			);
		});
		res.json({
			status: 'success',
			message: 'ticket created.',
			data: project.tickets,
		});
	} catch (err) {
		console.log(err);
		res.send('something went wrong.');
	}
};
exports.getOne = async (req, res) => {
	const { projectId, ticketId } = req.body;
	const project = await Project.findById(projectId);
	const ticket = project.tickets.filter((ticket) => {
		if (ticket._id == ticketId) return ticket;
	});

	res.json({
		status: 'success',
		message: 'got ticket',
		data: ticket,
	});
};

exports.getAll = async (req, res) => {
	const { id } = req.body;
	const project = await Project.findById(id);
	res.json({
		status: 'success',
		message: 'got all tickets',
		data: project.tickets,
	});
};

exports.update = async (req, res) => {
	const { projectId, ticketId, resolved } = req.body;
	const project = await Project.findById(projectId);
	const ticket = project.tickets.filter((ticket) => {
		if (ticket._id == ticketId) {
			ticket.resolved = resolved;
			project.assigned.map(async (e) => {
				const user = await User.findOne({ fullName: e });
				await createNotification(
					user._id,
					`ticket: ${ticket.title} changed to ${
						resolved ? 'resolved' : 'unresolved'
					} in project: ${project.title}`,
					1
				);
				return;
			});
		}
	});
	await project.save();
	res.json({
		status: 'success',
		message: 'ticket updated.',
		data: project,
	});
};

exports.delete = async (req, res) => {
	const { projectId, ticketId } = req.body;
	const project = await Project.findById(projectId);
	const newTickets = project.tickets.filter((ticket) => {
		if (ticket._id != ticketId) return ticket;
	});
	project.tickets = [...newTickets];
	await project.save();
	res.json({ status: 'success', message: 'ticket removed.' });
};

exports.createComment = async (req, res) => {
	const { projectId, ticketId, content } = req.body;
	const author = res.locals.currentUser.fullName;
	const project = await Project.findById(projectId);
	const ticket = project.tickets.id(ticketId);
	ticket.comments.push({ author, content });
	await project.save();
	res.json({
		status: 'success',
		message: 'comment submitted.',
		data: project,
	});
};

exports.createTicketUpdate = async (req, res) => {
	const { projectId, ticketId, content } = req.body;
	const project = await Project.findById(projectId);
	const ticket = project.tickets.id(ticketId);
	const username = res.locals.currentUser.fullName;
	ticket.updates.push({ author: username, content });
	await project.save();
	res.json({
		status: 'success',
		message: 'ticket update applied',
		data: project,
	});
};

exports.deleteTicketUpdate = async (req, res) => {
	console.log(res.locals.currentUser.fullName);
	console.log(req.body);
};
