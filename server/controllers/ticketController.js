/** @format */

const mongoose = require('mongoose');
const Project = require('../models/projectSchema');

exports.create = async (req, res) => {
	try {
		const { id, title, info, severity } = req.body;
		const author = res.locals.currentUser.fullName;
		const project = await Project.findById(id);
		project.tickets = [...project.tickets, { author, title, info, severity }];
		await project.save();
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
	const { projectId, ticketId, severity } = req.body;
	const project = await Project.findById(projectId);
	const ticket = project.tickets.filter((ticket) => {
		if (ticket._id == ticketId) {
			ticket.severity = severity;
			return ticket;
		}
	});
	await project.save();
	res.json({ status: 'success', message: 'ticket updated.' });
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
