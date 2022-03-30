/** @format */

const mongoose = require('mongoose');
const User = require('../models/userSchema');
const { decodeToken, verifyToken } = require('../helpers/tokenHelpers');

exports.isLoggedIn = async (req, res, next) => {
	try {
		const token = req.cookies.accessToken;
		const verified = verifyToken(token);
		if (!token || !verified) return res.send('not authorized.');
		const id = decodeToken(req.cookies.accessToken);
		const user = await User.findById(id);
		res.locals.currentUser = user;
	} catch (err) {
		console.log(err.message);
	}
	next();
};

exports.isAdmin = async (req, res, next) => {
	if (res.locals.currentUser.isAdmin) return next();
	return res.send('not authenticated.');
};
