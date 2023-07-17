const express = require('express');
const router = express.Router();
const destinationsCtrl = require('../controllers/destinations');

// POST /movies/:id/destinations (create review for a movie)
router.post('/flights/:id/destinations', destinationsCtrl.create);

module.exports = router;