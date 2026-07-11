// Add this inside models/taskStudentModel.js or a dedicated group model
const db = require('../config/db');

const GroupModel = {
    checkMembership: async (userId, groupId) => {
        const query = 'SELECT 1 FROM group_members WHERE user_id = ? AND grp_id = ?';
        const [rows] = await db.execute(query, [userId, groupId]);
        return rows.length > 0; // Returns true if they belong to the group, false otherwise
    }
};

module.exports = GroupModel;