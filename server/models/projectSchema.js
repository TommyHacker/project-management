/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Ticket = require('./ticketSchema');

const ProjectSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
			default: 'created',
			enum: ['created', 'in-progress', 'testing', 'deployment', 'complete'],
		},
		tickets: [Ticket],
		assigned: {
			type: Array,
			required: false,
			default: ['admin'],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
