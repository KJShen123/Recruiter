const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const dbConfig = require('./dbConfig');
const router = express.Router();  // Use Router to define the routes

async function loginUser(email, password, req) {
    if (!email || !password) {
        return { success: false, message: 'Email and password are required' };
    }

    try {
        // Establish a connection to the database
        let pool = await sql.connect(dbConfig).catch((err) => {
            console.error('Database connection error:', err);
            return { success: false, message: 'Database connection error' };
        });

        // Query the database to get all fields for the given email
        let result = await pool.request()
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM [User] WHERE Email = @email');

        if (result.recordset.length === 0) {
            return { success: false, message: 'User not found' };
        }

        // Extract hashed password and other user details
        const user = result.recordset[0];
        const hashedPassword = user.Password;

        // Compare input password with hashed password from the database
        const match = await bcrypt.compare(password, hashedPassword);

        if (match) {

            // Send session data to the client side to store in sessionStorage
            return {
                success: true,
                message: 'Login successful',
                UserID: user.UserID,
                userName: user.Username,
                companyName: user.CompanyName,
                email: user.Email
            };
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

    try {
        // Pass the `req` object to the `loginUser` function
        const result = await loginUser(email, password, req);

        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json(result); // Return 400 if login failed
        }
    } catch (err) {
        console.error('Error in /login route:', err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
