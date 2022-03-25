/** @format */

const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');
const { isLoggedIn } = require('../middleware/auth');

router
	.use(isLoggedIn)

	.post('/', ticketController.create)
	.post('/comment', ticketController.createComment);

router.get('/', ticketController.getOne).get('/all', ticketController.getAll);

router.patch('/', ticketController.update);

router.delete('/', ticketController.delete);

router.post('/updates', ticketController.createTicketUpdate);
router.delete('/updates', ticketController.deleteTicketUpdate);

module.exports = router;
