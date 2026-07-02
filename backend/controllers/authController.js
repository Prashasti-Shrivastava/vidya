const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

const authController = {
    register: async (req, res) => {
        const { name, userName, email, pass } = req.body;

        // Basic validation check
        if (!name || !userName || !email || !pass) {
            return res.status(400).json({ message: "All fields are required." });
        }

        try {
            // 1. Check if the email is already registered
            const emailExists = await User.checkExistsByEmail(email);
            if (emailExists) {
                return res.status(400).json({ message: "Email is already registered." });
            }

            // 2. Check if the username is already taken
            const usernameExists = await User.checkExistsByUsername(userName);
            if (usernameExists) {
                return res.status(400).json({ message: "Username is already taken." });
            }

            // 3. Hash the password securely
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(pass, salt);

            // 4. Save the new user to MySQL via the User model
            await User.create(name, userName, email, hashedPassword);

            // 5. Send success response
            return res.status(201).json({ message: "User registered successfully!" });

        } catch (error) {
            console.error("Registration Error:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
};

module.exports = authController;