/** @format */

const mongoose = require('mongoose');
const User = require('../models/userSchema');
const {
	createNotification,
	deleteNotification,
	updateNotificaiton,
} = require('../helpers/notificationHelpers');
const { hashPassword, verifyPassword } = require('../helpers/passwordHelpers');
const { createToken } = require('../helpers/tokenHelpers');

exports.register = async (req, res) => {
	try {
		const { fullName, email, password } = req.body;
		if (!fullName || !email || !password)
			return res.json({
				status: 'fail',
				message: 'name, email and password required.',
			});
		const hashedPassword = hashPassword(password);
		const user = new User({
			fullName,
			email,
			password: hashedPassword,
		});
		await user.save();
		await createNotification(user._id, 'Welcome to project management.');
		const accessToken = createToken(user._id);
		res.cookie('accessToken', accessToken);
		res.json({ status: 'success', message: 'user registered successfully.' });
	} catch (err) {
		console.log(err);
		res.json({ status: 'fail', message: err });
	}
};
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password)
			return res.json({
				status: 'fail',
				message: 'email and password required.',
			});
		const user = await User.findOne({ email }).select('+password');
		if (!user) return res.json({ status: 'fail', message: 'user not found.' });
		const verified = verifyPassword(password, user.password);
		if (!verified)
			return res.json({
				status: 'fail',
				message: 'username or password incorrect.',
			});
		user.password = '';
		const accessToken = createToken(user._id);
		res.cookie('accessToken', accessToken);
		res.json({ status: 'success', message: 'authenticated.', data: user });
	} catch (err) {
		console.log(err);
		res.json({ status: 'fail', message: 'something went wrong during login.' });
	}
};
exports.logout = (req, res) => {
	res.cookie('accessToken', '');
	res.json({ status: 'success', message: 'logged out successfully.' });
};
exports.update = async (req, res) => {
	try {
		const { password, newPassword } = req.body;
		const user = await User.findById(res.locals.currentUser._id).select(
			'+password'
		);
		const verified = verifyPassword(password, user.password);
		if (!verified)
			return res.json({ status: 'fail', message: 'not authorized.' });
		const hashedPassword = hashPassword(newPassword);
		user.password = hashedPassword;
		await user.save();
		await createNotification(user._id, 'Password changed.', 1);
		res.json({ status: 'success', message: 'user password updated.' });
	} catch (err) {
		console.log(err);
		res.json({
			status: 'fail',
			message: 'something went wrong while updating user.',
		});
	}
};
exports.delete = async (req, res) => {
	try {
		const { password } = req.body;
		const user = await User.findById(res.locals.currentUser._id).select(
			'+password'
		);
		const verified = verifyPassword(password, user.password);
		if (!verified)
			return res.json({ status: 'fail', message: 'not authorized.' });
		await user.delete();
		res.json({ status: 'success', message: 'user deleted' });
	} catch (err) {
		console.log(err);
		res.json({
			status: 'fail',
			message: 'something went wrong while trying to delete user.',
		});
	}
};
exports.getUser = async (req, res) => {
	res.json({
		status: 'success',
		message: 'user got',
		data: res.locals.currentUser,
	});
};
exports.getAllUsers = async (req, res) => {
	const users = await User.find({});
	res.json({ status: 'success', message: 'got all users.', data: users });
};

exports.deleteNotification = async (req, res) => {
	try {
		const notificationId = req.body.id;
		const notifications = await deleteNotification(
			res.locals.currentUser._id,
			notificationId
		);
		res.json({
			status: 'success',
			message: 'notification deleted.',
			data: notifications,
		});
	} catch (err) {
		res.send(err.message);
	}
};

exports.updateNotification = async (req, res) => {
	try {
		const id = res.locals.currentUser._id.toString();
		const notificationId = req.body.id;
		const notifications = await updateNotificaiton(id, notificationId);
		res.json({
			status: 'success',
			message: 'notification updated.',
			data: notifications,
		});
	} catch (err) {
		console.log(err.message);
	}
};

exports.isAdmin = async (req, res) => {
	const { id, isAdmin } = req.body;
	const user = await User.findById(id);
	if (user.fullName === 'admin')
		return res.json({
			status: 'fail',
			message: 'cannot revoke admin from admin.',
		});
	user.isAdmin = isAdmin;
	await user.save();
	res.send('updated');
};
exports.isDeveloper = async (req, res) => {
	const { id, isDeveloper } = req.body;
	const user = await User.findByIdAndUpdate(id, { isDeveloper });
	res.send('updated');
};
