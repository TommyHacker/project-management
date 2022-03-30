/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = require('./commentSchema');
const TicketUpdates = require('./ticketUpdates');

const TicketSchema = new Schema(
	{
		title: {
			type: String,
		},
		info: {
			type: String,
			required: true,
		},
		severity: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 3,
		},
		author: {
			type: String,
			required: true,
		},
		resolved: {
			type: Boolean,
			default: false,
		},
		comments: [CommentSchema],
		updates: [TicketUpdates],
	},
	{ timestamps: true }
);

module.exports = mongoose.Schema(TicketSchema);
