const mysql2 = require("mysql2/promise");

const db = mysql2.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'ERP',
});

module.exports = db;