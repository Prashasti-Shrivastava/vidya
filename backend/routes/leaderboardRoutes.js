const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

// Middlewares
const protect = require('../middleware/protect'); // Parses cookie, populates req.user
const checkGroupAccess = require('../middleware/checkGroupAccess'); // Enforces privacy bounds

// Apply them sequentially
router.get('/task', protect, checkGroupAccess, leaderboardController.getTaskTopThree);
router.get('/overall', protect, checkGroupAccess, leaderboardController.getOverallTopThree);

module.exports = router;