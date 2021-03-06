/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TicketUpdatesSchema = new Schema(
	{
		author: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.Schema(TicketUpdatesSchema);
