const Leaderboard = require('../models/leaderboardModel'); // Adjust path as needed

const leaderboardController = {
    // GET /api/leaderboard/task?groupId=X&taskId=Y
    getTaskTopThree: async (req, res) => {
        const { groupId, taskId } = req.query;

        if (!groupId || !taskId) {
            return res.status(400).json({ message: "Both groupId and taskId are required parameters." });
        }

        try {
            const topStudents = await Leaderboard.getTaskLeaderboard(groupId, taskId);
            
            return res.status(200).json({
                message: "Task leaderboard fetched successfully.",
                leaderboard: topStudents
            });
        } catch (error) {
            console.error("Task Leaderboard Error:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    },

    // GET /api/leaderboard/overall?groupId=X
    getOverallTopThree: async (req, res) => {
        const { groupId } = req.query;

        if (!groupId) {
            return res.status(400).json({ message: "groupId is a required parameter." });
        }

        try {
            const overallTop = await Leaderboard.getOverallLeaderboard(groupId);
            
            return res.status(200).json({
                message: "Overall group leaderboard fetched successfully.",
                leaderboard: overallTop
            });
        } catch (error) {
            console.error("Overall Leaderboard Error:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
};

module.exports = leaderboardController;