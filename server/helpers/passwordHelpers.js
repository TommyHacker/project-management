/** @format */

const bcrypt = require('bcrypt');
const saltRounds = 12;

exports.hashPassword = (password) => {
	return (hashedPassword = bcrypt.hashSync(password, saltRounds));
};

exports.verifyPassword = (password, hash) => {
	return (verified = bcrypt.compareSync(password, hash));
};
