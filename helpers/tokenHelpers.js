/** @format */

const jwt = require('jsonwebtoken');

exports.createToken = (id) => {
	return jwt.sign({ id }, process.env.TOKEN_SECRET);
};
exports.verifyToken = (token) => {
	try {
		jwt.verify(token, process.env.TOKEN_SECRET);
		return true;
	} catch (err) {
		return false;
	}
};

exports.decodeToken = (token) => {
	return (decodedToken = jwt
		.decode(token, process.env.TOKEN_SECRET)
		.id.toString());
};
