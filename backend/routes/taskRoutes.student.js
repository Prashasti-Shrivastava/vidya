const express = require('express');
const router = express.Router();
const taskStudentController = require('../controllers/taskController.student');
const protect = require('../middlewares/authMiddleware');

router.get('/my-tasks', protect, taskStudentController.getMyTasks);

module.exports = router;