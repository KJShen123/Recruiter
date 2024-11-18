const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const dbConfig = require('./dbConfig');
const router = express.Router();  // Use Router to define the routes

async function loginUser(email, password) {
    if (!email || !password) {
        return { success: false, message: 'Email and password are required' };
    }

    try {
        // Establish a connection to the database
        let pool = await sql.connect(dbConfig).catch((err) => {
            console.error('Database connection error:', err);
            return { success: false, message: 'Database connection error' };
        });

        // Query the database to get the hashed password and AccountID for the given email
        let result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT UserID, Password FROM [User] WHERE Email = @email');

        if (result.recordset.length === 0) {
            return { success: false, message: 'User not found' };
        }

        const hashedPassword = result.recordset[0].Password;
        const UserID = result.recordset[0].UserID;  // Get the AccountID from the result

        // Compare input password with hashed password from the database
        const match = await bcrypt.compare(password, hashedPassword);

        if (match) {
            return { success: true, message: 'Login successful', UserID: UserID };
        } else {
            return { success: false, message: 'Incorrect password' };
        }
    } catch (err) {
        console.error("Error during login:", err);
        return { success: false, message: 'Login error' };
    }
}

// Define the login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate the presence of email and password
    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const result = await loginUser(email, password);

    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(400).json(result); // Return 400 if login failed
    }
});


module.exports = router;