/** @format */

const mongoose = require('mongoose');
const User = require('../models/userSchema');

exports.createNotification = async (recipientId, content, importance) => {
	const user = await User.findById(recipientId);
	user.notifications.push({ content, importance });
	await user.save();
};

exports.deleteNotification = async (id, notificationId) => {
	const user = await User.findById(id);
	user.notifications.id(notificationId).remove();
	await user.save();
	return user.notifications;
};

exports.updateNotificaiton = async (id, notificationId) => {
	const user = await User.findById(id);
	const notification = user.notifications.id(notificationId);
	notification.seen = !notification.seen;
	await user.save();
	return user.notifications;
};
