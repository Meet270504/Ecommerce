const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Database configuration
const db = require('./dbconfig');

const app = express();

// Middleware
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse form submissions
app.use(cookieParser()); // Parse cookies
app.use(cors({ 
    origin: process.env.FRONTEND_URL, // Exact frontend URL
    credentials: true                // Allow cookies in cross-origin requests
}));
// app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Redirect root URL to index.html
//app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/html/index.html'));
//});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});