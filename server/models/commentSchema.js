/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
	{
		author: {
			type: String,
			required: true,
			default: 'Anonymous',
		},
		content: {
			type: String,
			required: true,
		},
		seen: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.Schema(CommentSchema);
