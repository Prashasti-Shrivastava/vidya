const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware'); // Our guard

// Public Routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected Patch Routes (Require valid JWT header token)
router.post('/logout', protect, authController.logout);
router.patch('/update-profile', protect, authController.updateProfile);
router.patch('/update-password', protect, authController.updatePassword);

module.exports = router;