const db = require('../config/db');

const TaskStudent = {
    // Fetch ALL tasks assigned to the student's group, including their submission status and scores
    getStudentTasks: async (studentId) => {
        const query = `
            SELECT 
                t.id AS task_id,
                t.title,
                t.description,
                t.max_score, -- Added: Maximum possible score
                t.created_at AS task_created_at,
                teacher.name AS teacher_name,
                sub.status,
                sub.submission_text,
                sub.submitted_at,
                sub.score -- Added: Graded score (will be NULL if pending or ungraded)
            FROM group_members gm
            JOIN task_assignments ta ON gm.grp_id = ta.grp_id
            JOIN tasks t ON ta.task_id = t.id
            JOIN users teacher ON t.created_by = teacher.id
            LEFT JOIN student_submissions sub ON t.id = sub.task_id AND sub.student_id = gm.user_id
            WHERE gm.user_id = ?
            ORDER BY t.created_at DESC
        `;

        const [rows] = await db.execute(query, [studentId]);
        return rows;
    },
    // NEW: Insert or update a task submission
    submitTask: async (taskId, studentId, submissionText) => {
        const query = `
            INSERT INTO student_submissions (task_id, student_id, status, submission_text, submitted_at, score)
            VALUES (?, ?, 'submitted', ?, NOW(), NULL)
            ON DUPLICATE KEY UPDATE 
                status = 'submitted', 
                submission_text = ?, 
                submitted_at = NOW(), 
                score = NULL -- Resets score if they resubmit an updated version
        `;

        const [result] = await db.execute(query, [taskId, studentId, submissionText, submissionText]);
        return result;
    },

    // NEW: Helper to verify if the task is actually assigned to the student's group
    checkTaskAssignment: async (taskId, studentId) => {
        const query = `
            SELECT 1 FROM group_members gm
            JOIN task_assignments ta ON gm.grp_id = ta.grp_id
            WHERE ta.task_id = ? AND gm.user_id = ?
        `;
        const [rows] = await db.execute(query, [taskId, studentId]);
        return rows.length > 0;
    }
};

module.exports = TaskStudent;