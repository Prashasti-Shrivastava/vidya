const db = require('../config/db');

const Task = {
    //  Create a Master Task Template (No due_date)
    create: async (title, description, createdBy) => {
        const [result] = await db.execute(
            'INSERT INTO tasks (title, description, created_by) VALUES (?, ?, ?)',
            [title, description, createdBy]
        );
        return result; 
    },

    //  Assign an existing Task to a Group (Matches: id, task_id, group_id, assigned_at)
    assignToGroup: async (taskId, groupId) => {
        const [result] = await db.execute(
            'INSERT INTO task_assignments (task_id, group_id) VALUES (?, ?)',
            [taskId, groupId]
        );
        return result;
    },

    // Prevent duplicate group assignments
    checkAssignmentExists: async (taskId, groupId) => {
        const [rows] = await db.execute(
            'SELECT id FROM task_assignments WHERE task_id = ? AND group_id = ?',
            [taskId, groupId]
        );
        return rows[0];
    }
};

module.exports = Task;