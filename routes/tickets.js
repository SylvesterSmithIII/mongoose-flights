const express = require('express');
const router = express.Router();
const ticketsCtrl = require('../controllers/tickets');

// POST /movies/:id/destinations (create review for a movie)
router.get('/flights/:id/tickets/new', ticketsCtrl.new);

router.post('/flights/:id/tickets', ticketsCtrl.create)

module.exports = router;