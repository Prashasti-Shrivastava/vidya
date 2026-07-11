const TaskStudent = require('../models/taskStudentModel');

const taskStudentController = {
    getMyTasks: async (req, res) => {
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: "Access denied. Students only." });
        } 

        const studentId = req.user.id; 

        try {
            const allTasks = await TaskStudent.getStudentTasks(studentId);

            // Filter logic matching the database ENUM states
            // Completed tasks are the ones explicitly marked as 'submitted'
            const completed = allTasks.filter(task => task.status === 'submitted');
            
            // Uncompleted tasks are either explicitly 'pending' OR have never been touched (status is null)
            const uncompleted = allTasks.filter(task => task.status === 'pending' || task.status === null);

            return res.status(200).json({
                message: "Tasks fetched successfully.",
                completed,
                uncompleted
            });

        } catch (error) {
            console.error("Fetch Student Tasks Error:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    },
    // NEW: Handle task submission
    submitTask: async (req, res) => {
        if (req.user.role !== 'student') {
            return res.status(403).json({ message: "Access denied. Students only." });
        }

        const { taskId, submissionText } = req.body;
        const studentId = req.user.id;

        if (!taskId || !submissionText) {
            return res.status(400).json({ message: "Task ID and submission text are required." });
        }

        try {
            // Security Check: Make sure the student is actually in a group assigned to this task
            const isAssigned = await TaskStudent.checkTaskAssignment(taskId, studentId);
            if (!isAssigned) {
                return res.status(403).json({ message: "Access denied. This task is not assigned to your group." });
            }

            // Save or update the submission in the database
            await TaskStudent.submitTask(taskId, studentId, submissionText);

            return res.status(200).json({ 
                message: "Task submitted successfully!",
                submission: { taskId, submissionText }
            });

        } catch (error) {
            console.error("Submit Task Error:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
};

module.exports = taskStudentController;