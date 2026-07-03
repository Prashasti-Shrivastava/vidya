const db = require('../config/db');

const TaskStudent = {
    // Fetch ALL tasks assigned to the student's group, including their submission status
    getStudentTasks: async (studentId) => {
        // backticks (`) for multi-line support for sql queries 
        const query = `
            SELECT 
                t.id AS task_id,
                t.title,
                t.description,
                t.created_at AS task_created_at,
                teacher.name AS teacher_name,
                sub.status,
                sub.submission_text,
                sub.submitted_at
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
    }
};

module.exports = TaskStudent;
