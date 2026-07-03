const Task = require('../models/taskModel');

const taskAdminController = {
    createTask: async (req, res) => {
        // Fallback safety check 
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const { title, description } = req.body;
        const adminId = req.user.id; 

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        try {
            const result = await Task.create(title, description, adminId);
            
            // Reusing result.insertId to pass back to the frontend
            return res.status(201).json({
                message: "Task created successfully!",
                taskId: result.insertId,
                task: { 
                    id: result.insertId, 
                    title, 
                    description, 
                    created_by: adminId 
                }
            });
        } catch (error) {
            console.error("Create Task Error:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    },

    assignTask: async (req, res) => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const { taskId, groupId } = req.body;

        if (!taskId || !groupId) {
            return res.status(400).json({ message: "Task ID and Group ID are required." });
        }

        try {
            const alreadyAssigned = await Task.checkAssignmentExists(taskId, groupId);
            if (alreadyAssigned) {
                return res.status(400).json({ message: "This task is already assigned to this group." });
            }

            await Task.assignToGroup(taskId, groupId);
            return res.status(200).json({ message: `Task successfully assigned to group ${groupId}!` });
        } catch (error) {
            console.error("Assign Task Error:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
};

module.exports = taskAdminController;