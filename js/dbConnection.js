const sql = require('mssql');
const dbConfig = require('./dbConfig');

async function connectToDatabase() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log(`Connected to the database: ${dbConfig.database}`);
        return pool;
    } catch (error) {
        console.error("Database connection failed:", error);
    }
}

module.exports = connectToDatabase;