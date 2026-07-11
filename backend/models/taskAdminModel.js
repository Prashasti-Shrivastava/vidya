const db = require('../config/db');

const Task = {
    //  Create a Master Task Template with max_score (Defaults to 100.00)
    create: async (title, description, createdBy, maxScore = 100.00) => {
        const [result] = await db.execute(
            'INSERT INTO tasks (title, description, created_by, max_score) VALUES (?, ?, ?, ?)',
            [title, description, createdBy, maxScore]
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
    },
    findMaxScoreBySubmissionId: async (submissionId) => {
        const [rows] = await db.execute(
            `SELECT t.max_score FROM tasks t 
             JOIN student_submissions s ON s.task_id = t.id 
             WHERE s.id = ?`,
            [submissionId]
        );
        return rows[0]; // Returns { max_score: X } or undefined
    },

    // NEW: Update the score and set the status to 'submitted' (if not already)
    gradeSubmission: async (submissionId, score) => {
        const [result] = await db.execute(
            'UPDATE student_submissions SET score = ? WHERE id = ?',
            [score, submissionId]
        );
        return result;
    }
};

module.exports = Task;