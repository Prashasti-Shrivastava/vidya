const mysql = require('mysql2');
require('dotenv').config(); //his loads your .env file variables into your application's memory (process.env)

// Create a connection pool to handle multiple simultaneous requests efficiently
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'vidya',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convert the pool to use modern Promises instead of old-school callbacks
const promisePool = pool.promise();

module.exports = promisePool;

//A Connection Pool keeps a collection of active, open "phone lines" sitting in memory waiting to be used. When an API request comes in, it instantly borrows an active line, runs its query, and throws the line back into the pool for the next user.

//connectionLimit: 10: This creates exactly 10 active connections on startup. Your server can process up to 10 database operations concurrently. If your backend scales down the road, you can increase this number to 50 or 100.

//waitForConnections: true: What happens if all 10 connections are completely busy and an 11th user tries to load their dashboard? With this set to true, the server won't crash or throw an immediate error. It will force the 11th request to wait politely until one of the first 10 finishing queries drops their connection back into the pool.

//queueLimit: 0: This controls how many requests can wait in line when all connections are busy. Setting it to 0 means infinity. The queue can scale infinitely, and requests will wait in line without being dropped.