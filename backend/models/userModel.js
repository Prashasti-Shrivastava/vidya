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
    },
//during create and update operations , the db returns 
// You would see that rawOutput is an array containing exactly two elements:

// JavaScript
// [
//   // Element 0: The actual execution status object (ResultSetHeader)
//   { fieldCount: 0, affectedRows: 1, insertId: 14, ... }, 
  
//   // Element 1: Columns metadata (This is undefined for INSERT/UPDATE)
//   undefined 
// ]
   

    //  DELETE USER ACCOUNT
    deleteById: async (id) => {
        const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);
        return result;
    },

    // Fetch the password hash securely by ID (for password update validation)
    findPasswordById: async (id) => {
        const [rows] = await db.execute('SELECT password FROM users WHERE id = ?', [id]);//const rows = result[0]; // Exactly equivalent to const [rows]
        return rows[0];//the db returns rows as an array , here we will have array of lenghth 1 cuz that query corresponds to a unique entry in db, rows[0] returns an object containing wha the query was made for-- here,password, if the query was for password,email the object would contain both key value pairs of pass and email
    },
    //this db query would return an array containg 2 elements first one is an array of objects containing the query result and the second one is an array of meta data about the query execution
  //[a,b]=arr   means getting the first ele of arr in a and second ele in b

    // Update profile info (Name/Username)
    updateProfile: async (id, name, username) => {
        const [result] = await db.execute(
            'UPDATE users SET name = ?, username = ? WHERE id = ?',
            [name, username, id]
        );
        return result;
    },

    // Update password explicitly
    updatePassword: async (id, newHashedPassword) => {
        const [result] = await db.execute(
            'UPDATE users SET password = ? WHERE id = ?',
            [newHashedPassword, id]
        );
        return result;
    },

    // Inside backend/models/userModel.js

checkExistsByUsername: async (username) => {
    // We explicitly select 'id' to optimize performance instead of SELECT *
    const [rows] = await db.execute('SELECT id FROM users WHERE username = ?', [username]);
    return rows[0]; // Returns { id: 5 } if taken, or undefined if the username is free
},


};



    module.exports = User;

// Action,"CommonJS (""type"": ""commonjs"")","ES Modules (""type"": ""module"")"
// Exporting Code,module.exports = User;,export default User;
// Importing Code,const User = require('./userModel');,import User from './userModel.js';