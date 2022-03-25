/** @format */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

router
	.post('/register', userController.register)
	.post('/login', userController.login);

router.use(isLoggedIn);

router
	.patch('/isDeveloper', isAdmin, userController.isDeveloper)
	.patch('/isadmin', isAdmin, userController.isAdmin)
	.patch('/notification/', userController.updateNotification)
	.patch('/notification/delete', userController.deleteNotification)
	.patch('/', userController.update);
router
	.get('/', userController.getUser)
	.get('/all', isAdmin, userController.getAllUsers);
router
	.delete('/logout', userController.logout)
	.delete('/', userController.delete);

module.exports = router;
