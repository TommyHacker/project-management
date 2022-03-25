/** @format */

const mongoose = require('mongoose');
const Project = require('../models/projectSchema');
const { createNotification } = require('../helpers/notificationHelpers');
const User = require('../models/userSchema');

exports.create = async (req, res) => {
	const { title } = req.body;
	const project = new Project({ title });
	await project.save();
	const projects = await Project.find({});
	res.json({ status: 'success', message: 'project created.', data: projects });
};
exports.readOne = async (req, res) => {
	const { id } = req.params;
	const project = await Project.findById(id);
	res.json({ status: 'success', message: 'project fetched.', data: project });
};

exports.update = async (req, res) => {
	try {
		const { id, assigned, status } = req.body;
		const project = await Project.findByIdAndUpdate(id, { assigned, status });
		await project.save();
		project.assigned.map(async (dev) => {
			const user = await User.findOne({ fullName: dev });
			await createNotification(
				user._id,
				`you have been assigned to new project. ${project._id}`
			);
		});
		res.json({ status: 'success', message: 'project updated.' });
	} catch (err) {
		console.log(err);
		res.send('not this time.');
	}
};

exports.delete = async (req, res) => {
	const { id } = req.body;
	const project = await Project.findByIdAndDelete(id);
	res.json({ status: 'success', message: 'project deleted.' });
};

exports.readAll = async (req, res) => {
	const projects = await Project.find({});
	const usersProjects = projects.filter((project) => {
		if (project.assigned.includes(res.locals.currentUser.fullName.toString()))
			return project;
		return;
	});
	res.json({
		status: 'success',
		message: 'projects found.',
		data: usersProjects,
	});
};

exports.getAllProjects = async (req, res) => {
	const projects = await Project.find({});
	res.send(projects);
};

exports.getUserStats = async (req, res) => {
	const fullName = res.locals.currentUser.fullName;
	const projects = await Project.find({});
	let projectsCount = [];
	const userProjects = projects.filter((project) => {
		if (project.assigned.includes(fullName)) return projectsCount.push(project);
		return;
	});
	let ticketsCount = [];
	const tickets = projects.filter((project) => {
		project.tickets.filter((ticket) => {
			if (ticket.author == fullName) return ticketsCount.push(ticket);
			return;
		});
	});

	res.json({
		status: 'success',
		message: 'user stats found.',
		data: { ticketsCount, projectsCount },
	});
};
