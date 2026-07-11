const express = require('express');
const router = express.Router();
const taskAdminController = require('../controllers/taskController.admin');
const protect = require('../middlewares/authMiddleware');

router.post('/create', protect, taskAdminController.createTask);
router.post('/assign', protect, taskAdminController.assignTask);
router.patch('/grade-submission', protect, taskAdminController.gradeSubmission);
router.get('/pending-submissions', protect, taskAdminController.getPendingSubmissions);

module.exports = router;