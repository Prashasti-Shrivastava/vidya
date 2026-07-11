const GroupModel = require('../models/groupModel'); // Adjust path to where you put the helper

const checkGroupAccess = async (req, res, next) => {
    // 1. Let admins see everything unconditionally
    if (req.user.role === 'admin') {
        return next();
    }

    // 2. Extract groupId dynamically from query strings (?groupId=X) or route params (/group/:groupId)
    const groupId = req.query.groupId || req.params.groupId;

    if (!groupId) {
        return res.status(400).json({ message: "Group ID parameter is missing from the request." });
    }

    try {
        // 3. Check if this student belongs to the requested group
        const isMember = await GroupModel.checkMembership(req.user.id, groupId);

        if (!isMember) {
            // Intercept and halt the request right here
            return res.status(403).json({ 
                message: "Access denied. You are not a registered member of this group." 
            });
        }

        // 4. Everything matches safely, proceed to the controller
        next();
    } catch (error) {
        console.error("Group Privacy Guard Error:", error);
        return res.status(500).json({ message: "Internal server error during authorization check." });
    }
};

module.exports = checkGroupAccess;