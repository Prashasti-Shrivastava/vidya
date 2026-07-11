const Task = require('../models/taskAdminModel');

const taskAdminController = {
    createTask: async (req, res) => {
        // Fallback safety check 
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        // Destructure maxScore from the request body
        const { title, description, maxScore } = req.body;
        const adminId = req.user.id; 

        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        // Optional validation: Ensure maxScore is a positive number if provided
        if (maxScore !== undefined && (isNaN(maxScore) || maxScore <= 0)) {
            return res.status(400).json({ message: "Maximum score must be a positive number." });
        }

        try {
            // Pass maxScore along to the model method
            const result = await Task.create(title, description, adminId, maxScore);
            
            return res.status(201).json({
                message: "Task created successfully!",
                taskId: result.insertId,
                task: { 
                    id: result.insertId, 
                    title, 
                    description, 
                    max_score: maxScore || 100.00, // Show fallback default if they left it blank
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
    },
    gradeSubmission: async (req, res) => {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        const { submissionId, score } = req.body;

        if (submissionId === undefined || score === undefined) {
            return res.status(400).json({ message: "Submission ID and score are required." });
        }

        // Ensure score is a valid positive number
        if (isNaN(score) || score < 0) {
            return res.status(400).json({ message: "Score must be a positive number." });
        }

        try {
            // 1. Verify the submission exists and fetch the maximum allowed score for that task
            const taskData = await Task.findMaxScoreBySubmissionId(submissionId);
            if (!taskData) {
                return res.status(404).json({ message: "Submission record not found." });
            }

            // 2. Prevent giving a grade higher than the max_score constraint
            if (score > taskData.max_score) {
                return res.status(400).json({ 
                    message: `Invalid score value. The maximum score allowed for this task is ${taskData.max_score}.` 
                });
            }

            // 3. Update the database
            await Task.gradeSubmission(submissionId, score);

            return res.status(200).json({
                message: "Submission graded successfully!",
                data: {
                    submissionId,
                    score,
                    maxScore: taskData.max_score
                }
            });
        } catch (error) {
            console.error("Grade Submission Error:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    },

    //  Fetch pending grading submissions for a specific admin (teacher) yet to review
getPendingSubmissions: async (req, res) => {
    // 1. Role verification
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const adminId = req.user.id; // Extracted securely from cookie middleware

    try {
        // 2. Fetch the pending data
        const pendingList = await Task.getPendingGrading(adminId);

        // 3. Return the payload along with a count
        return res.status(200).json({
            message: "Pending submissions fetched successfully.",
            count: pendingList.length,
            submissions: pendingList
        });
    } catch (error) {
        console.error("Fetch Pending Submissions Error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}
};

module.exports = taskAdminController;