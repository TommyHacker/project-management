/** @format */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notificationSchema = require('./notificationSchema');

const UserSchema = new Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		isVerified: {
			tye: Boolean,
			default: false,
		},
		isAdmin: {
			type: Boolean,
			default: false,
			required: true,
		},
		isDeveloper: {
			type: Boolean,
			default: false,
		},
		email: {
			required: true,
			type: String,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		notifications: [notificationSchema],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
