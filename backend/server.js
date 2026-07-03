const express = require('express');
const cors = require('cors');
require('dotenv').config();      //to load env variables from .env file into process.env
const db = require('./config/db'); // Import our database connection pool
const authRoutes = require('./routes/authRoutes');
const taskRoutesAdmin = require('./routes/taskRoutes.admin');
const taskStudentRoutes = require('./routes/taskRoutes.student');
const cookieParser = require('cookie-parser'); // Import the cookie-parser middleware

const app = express();

// Middlewares
// app.use(cors({
//     origin: 'http://localhost:5173', // Your React development URL (e.g., Vite defaults to 5173)
//     credentials: true // Crucial! Tells CORS to allow cookies to travel over the wire
// }));
app.use(cors());



//app.use(cors());    // Allows cross-origin resource sharing --- if frontend and backend are hosted on different domains or ports, this is necessary for the frontend to communicate with the backend
app.use(express.json());  // Parses incoming JSON payloads
app.use(cookieParser()); //  Enable cookie parsing globally


app.use('/api/auth', authRoutes);
app.use('/api/admin/tasks', taskRoutesAdmin);
app.use('/api/student', taskStudentRoutes);
//testDbConnection();

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});