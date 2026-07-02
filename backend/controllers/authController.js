const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // 1. Import JWT library
require('dotenv').config();

// Helper function to generate a secure token
const generateToken = (id, role) => {
    //  embed the user's ID and role inside the token payload
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '30d' // Token remains valid for 30 days
    });
};

const authController = {
    register: async (req, res) => {
        const { name, userName, email, pass } = req.body;

        if (!name || !userName || !email || !pass) {
            return res.status(400).json({ message: "All fields are required." });
        }

        try {
            const emailExists = await User.checkExistsByEmail(email);
            if (emailExists) return res.status(400).json({ message: "Email is already registered." });

            const usernameExists = await User.checkExistsByUsername(userName);
            if (usernameExists) return res.status(400).json({ message: "Username is already taken." });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(pass, salt);

            // Save user to MySQL
            const result = await User.create(name, userName, email, hashedPassword);
            const newUserId = result.insertId; // Grab the newly created auto-incremented ID

            // 2. Generate a token immediately for a seamless signup experience
            const token = generateToken(newUserId, 'student');

            return res.status(201).json({ 
                message: "User registered successfully!",
                token, // Send token to frontend
                user: { id: newUserId,
                        name,
                        username: userName,
                        role: 'student' }
            });

        } catch (error) {
            console.error("Registration Error:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    },

    login: async (req, res) => {
        const { email, pass } = req.body;

        if (!email || !pass) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        try {
            const user = await User.findForLogin(email);
            if (!user) return res.status(401).json({ message: "Invalid email or password." });

            const isMatch = await bcrypt.compare(pass, user.password);
            if (!isMatch) return res.status(401).json({ message: "Invalid email or password." });

            // 3. Generate token with user's actual database ID and Role
            const token = generateToken(user.id, user.role);

            // Send everything React needs to establish the session
            return res.status(200).json({
                message: "Login successful!",
                token, // Send token to frontend
                user: {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    role: user.role
                }
            });

        } catch (error) {
            console.error("Login Error:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    }
};

module.exports = authController;