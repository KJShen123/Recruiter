const express = require("express");
const path = require("path");
const expressSession = require('express-session');
const authRoutes = require('./js/authRoutes');  
const connectToDatabase = require("./js/dbConnection.js");

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Session middleware (Ensure this is added before defining routes)
app.use(expressSession({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false // Use 'secure: true' in production if using HTTPS
    }
}));

// Route to clear session
app.get('/clear-session', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error clearing session:', err);
            return res.status(500).send("Failed to clear session");
        }
        console.log('Session cleared successfully');
        res.send({ message: "Session cleared" });
    });
});

// Serve static files from the 'public' folder (CSS, JS, HTML, etc.)
app.use(express.static(path.join(__dirname, 'public')));  

// Authentication-related routes (login)
app.use(authRoutes);


// Connect to the database
connectToDatabase();

// Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

const server = app.listen(5000);
const portNumber = server.address().port;
console.log(`port is open on ${portNumber}`);
