const mysql = require('mysql2');

const dbConnection = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

async function transaction(callback) {

    const connection = await dbConnection.promise().getConnection();
    await connection.beginTransaction();

    try {
        await callback(connection);
        await connection.commit();
    } catch (err) {
        await connection.rollback();
        throw err;
    } finally {
        connection.release();
    }
}

module.exports.dbConnection = dbConnection;
module.exports.transaction = transaction;
