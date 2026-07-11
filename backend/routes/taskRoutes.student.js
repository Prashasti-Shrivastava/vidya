const express = require('express');
const router = express.Router();
const taskStudentController = require('../controllers/taskController.student');
const protect = require('../middlewares/authMiddleware');

router.get('/my-tasks', protect, taskStudentController.getMyTasks);
router.post('/submit-task', protect, taskStudentController.submitTask);

module.exports = router;