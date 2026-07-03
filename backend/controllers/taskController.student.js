const TaskStudent = require('../models/taskStudentModel');

const taskStudentController = {
    getMyTasks: async (req, res) => {

        if (req.user.role !== 'student') {
            return res.status(403).json({ message: "Access denied. Students only." });
        } 

        const studentId = req.user.id; // Extracted securely from the cookie middleware

        try {
            // Fetch everything assigned to this student
            const allTasks = await TaskStudent.getStudentTasks(studentId);

            // Separate them cleanly into two arrays based on their status flag
            const completed = allTasks.filter(task => task.status === 'completed');
            const uncompleted = allTasks.filter(task => task.status === 'uncompleted');

            return res.status(200).json({
                message: "Tasks fetched successfully.",
                completed,
                uncompleted
            });

        } catch (error) {
            console.error("Fetch Student Tasks Error:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
};

module.exports = taskStudentController;