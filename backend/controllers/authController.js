const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // 1. Import JWT library
require('dotenv').config();

// Helper function to generate a secure token
const generateToken = (id, role) => {
    //  embed the user's ID and role inside the token payload
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '15d' // Token remains valid for 15 days
    });
};


// Reusable configuration object for secure cookies
const cookieOptions = {
    httpOnly: true, // Blocks XSS attacks completely
    secure: process.env.NODE_ENV === 'production', // true if deployed on HTTPS, false on localhost
    //sameSite: 'strict', // Blocks CSRF attacks
    sameSite: 'lax', // Allows the cookie to travel between port 5173 and 5000 safely! diff domains for frontend and backend
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    path: '/',
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
             if(!salt) res.send("salt not generated");
            const hashedPassword = await bcrypt.hash(pass, salt);
            if(!hashedPassword){
                res.send("password not hashed");
            }
           // res.send("password hashed");

            

            const result = await User.create(name, userName, email, hashedPassword);
           // res.send(result);
            const newUserId = result.insertId;
           // res.send(newUserId);

            const token = generateToken(newUserId, 'student');
           // res.send(token);

            // Set the cookie automatically for registration
            res.cookie('token', token, cookieOptions);

            return res.status(201).json({ 
                message: "User registered successfully!",
                user: { id: newUserId, name, username: userName, role: 'student' }
            });

        } catch (error) {
            console.error(error);
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

            const token = generateToken(user.id, user.role);

            // Set the cookie automatically for login
            res.cookie('token', token, cookieOptions);

            return res.status(200).json({
                message: "Login successful!",
                user: { id: user.id, name: user.name, username: user.username, role: user.role }
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error." });
        }
    },

    logout: async (req, res) => {
        try {
            // 3. Clear the cookie completely on logout
           res.clearCookie('token', { path: '/' });
            return res.status(200).json({ message: "Logged out successfully." });
        } catch (error) {
            return res.status(500).json({ message: "Internal server error." });
        }
    },

    //  UPDATE PROFILE (Name & Username change)
    updateProfile: async (req, res) => {
        const { name, userName } = req.body;
        const userId = req.user.id; // Extracted safely by auth middleware!

        if (!name || !userName) {
            return res.status(400).json({ message: "Name and username are required." });
        }

        try {
            // Check if the new username is already taken by SOMEONE ELSE
            const usernameExists = await User.checkExistsByUsername(userName);
            
            // If it exists, make sure it doesn't belong to the current user making the request
            if (usernameExists && usernameExists.id !== userId) {
                return res.status(400).json({ message: "Username is already taken by another user." });
            }

            // Update the record
            await User.updateProfile(userId, name, userName);

            return res.status(200).json({
                message: "Profile updated successfully!",
                user: { name, username: userName }
            });
        } catch (error) {
            console.error("Update Profile Error:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    },

    // UPDATE PASSWORD (Secure verification check)
    updatePassword: async (req, res) => {
        const { oldPass, newPass } = req.body;
        const userId = req.user.id;

        if (!oldPass || !newPass) {
            return res.status(400).json({ message: "Both old and new passwords are required." });
        }

        try {
            // Fetch the user's current hashed password from the DB
            const user = await User.findPasswordById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }

            // Verify if the old password provided matches the database hash
            const isMatch = await bcrypt.compare(oldPass, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Incorrect old password." });
            }

            // Hash the brand-new password securely
            const salt = await bcrypt.genSalt(10);
            const hashedNewPassword = await bcrypt.hash(newPass, salt);

            // Update the password column in MySQL
            await User.updatePassword(userId, hashedNewPassword);

            return res.status(200).json({ message: "Password updated successfully!" });
        } catch (error) {
            console.error("Update Password Error:", error);
            return res.status(500).json({ message: "Internal server error." });
        }
    },
};

module.exports = authController;