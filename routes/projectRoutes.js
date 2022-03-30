/** @format */

const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const { isLoggedIn, isAdmin } = require('../middleware/auth');

router
	.use(isLoggedIn)
	.post('/', projectController.create)
	.get('/one/:id', projectController.readOne)
	.get('/all', projectController.readAll)
	.get('/all/admin', isAdmin, projectController.getAllProjects)
	.patch('/', projectController.update)
	.delete('/', isAdmin, projectController.delete)

	// this will be to get the global stats for dashboard on the front end...

	.get('/dashboardConfession', projectController.getUserStats);

module.exports = router;
