const db = require('../config/db');

const User = {
    // 1. Used for LOGIN: We explicitly need the password to compare it, plus basic info
    findForLogin: async (email) => {
        const [rows] = await db.execute(
            'SELECT id, name, username, email, password, role FROM users WHERE email = ?', 
            [email]
        );
        return rows[0];
    },

    // 2. Used for REGISTRATION checks: Just select the 'id' to see if anything comes back
    checkExistsByEmail: async (email) => {
        const [rows] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
        return rows[0]; // Returns { id: X } if it exists, or undefined if free
    },

    checkExistsByUsername: async (username) => {
        const [rows] = await db.execute('SELECT id FROM users WHERE username = ?', [username]);
        return rows[0];
    },

    // 3. CREATE 
    create: async (name, username, email, hashedPassword) => {
        const [result] = await db.execute(
            'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)',
            [name, username, email, hashedPassword]
        );
        return result; 
    }
};

// 4. UPDATE USER PROFILE INFO
    updateProfile: async (id, name, username) => {
        const [result] = await db.execute(
            'UPDATE users SET name = ?, username = ? WHERE id = ?',
            [name, username, id]
        );
        return result; // result.affectedRows tells you if the update was successful
    };

    // 5. DELETE USER ACCOUNT
    deleteById: async (id) => {
        const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
        return result;
    };

    module.exports = User;

// Action,"CommonJS (""type"": ""commonjs"")","ES Modules (""type"": ""module"")"
// Exporting Code,module.exports = User;,export default User;
// Importing Code,const User = require('./userModel');,import User from './userModel.js';