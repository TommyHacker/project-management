/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema(
	{
		content: {
			type: String,
			required: true,
		},
		sender: {
			type: String,
			required: true,
			default: 'system',
		},
		importance: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
			max: 3,
		},
		seen: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.Schema(NotificationSchema);
