const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');
const protect = require('../middleware/protect'); // Your cookie auth middleware

// Both routes are protected by auth, but open to any logged-in role
router.get('/task', protect, leaderboardController.getTaskTopThree);
router.get('/overall', protect, leaderboardController.getOverallTopThree);

module.exports = router;