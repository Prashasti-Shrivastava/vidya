const db = require('../config/db');

const Leaderboard = {
    // // 1. Top 3 students for a specific task in a group
    // getTaskLeaderboard: async (groupId, taskId) => {
    //     const query = `
    //         SELECT 
    //             u.name, 
    //             COALESCE(sub.score, 0) AS score
    //         FROM group_members gm
    //         JOIN users u ON gm.user_id = u.id
    //         LEFT JOIN student_submissions sub ON sub.student_id = gm.user_id AND sub.task_id = ?
    //         WHERE gm.grp_id = ?
    //         ORDER BY score DESC
    //         LIMIT 3;
    //     `;
    //     const [rows] = await db.execute(query, [taskId, groupId]);
    //     return rows;
    // },

    // // 2. Top 3 students overall for all tasks in a group combined
    // getOverallLeaderboard: async (groupId) => {
    //     const query = `
    //         SELECT 
    //             u.name, 
    //             SUM(COALESCE(sub.score, 0)) AS total_score
    //         FROM group_members gm
    //         JOIN users u ON gm.user_id = u.id
    //         LEFT JOIN student_submissions sub ON sub.student_id = gm.user_id
    //         WHERE gm.grp_id = ?
    //         GROUP BY u.id, u.name
    //         ORDER BY total_score DESC
    //         LIMIT 3;
    //     `;
    //     const [rows] = await db.execute(query, [groupId]);
    //     return rows;
    // }
    getTaskLeaderboard: async (groupId, taskId) => {
    const query = `
        SELECT name, score, student_rank FROM (
            SELECT 
                u.name, 
                COALESCE(sub.score, 0) AS score,
                DENSE_RANK() OVER (ORDER BY COALESCE(sub.score, 0) DESC) AS student_rank
            FROM group_members gm
            JOIN users u ON gm.user_id = u.id
            LEFT JOIN student_submissions sub ON sub.student_id = gm.user_id AND sub.task_id = ?
            WHERE gm.grp_id = ?
        ) ranked_tasks
        WHERE student_rank <= 3
        ORDER BY student_rank ASC, name ASC;
    `;
    const [rows] = await db.execute(query, [taskId, groupId]);
    return rows;
},

getOverallLeaderboard: async (groupId) => {
    const query = `
        SELECT name, total_score, student_rank FROM (
            SELECT 
                u.name, 
                SUM(COALESCE(sub.score, 0)) AS total_score,
                DENSE_RANK() OVER (ORDER BY SUM(COALESCE(sub.score, 0)) DESC) AS student_rank
            FROM group_members gm
            JOIN users u ON gm.user_id = u.id
            LEFT JOIN student_submissions sub ON sub.student_id = gm.user_id
            WHERE gm.grp_id = ?
            GROUP BY u.id, u.name
        ) ranked_students
        WHERE student_rank <= 3
        ORDER BY student_rank ASC, name ASC;
    `;
    const [rows] = await db.execute(query, [groupId]);
    return rows;
}
};

module.exports = Leaderboard;