const express = require('express');
const cors = require('cors');
require('dotenv').config();      //to load env variables from .env file into process.env
const db = require('./config/db'); // Import our database connection pool

const app = express();

// Middlewares
app.use(cors());    // Allows cross-origin resource sharing --- if frontend and backend are hosted on different domains or ports, this is necessary for the frontend to communicate with the backend
app.use(express.json());  // Parses incoming JSON payloads

// Test the MySQL Database Connection on server startup
async function testDbConnection() {
    try {
        // Run a simple query to see if it responds
        const [rows] = await db.execute('SELECT 1 + 1 AS result');
        console.log(' Connected to MySQL Database successfully!');
    } catch (error) {
        console.error(' Database connection failed:', error.message);
    }
}

testDbConnection();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});