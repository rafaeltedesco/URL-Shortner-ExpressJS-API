const mysql = require('mysql2/promise');

const DB_CONFIG = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
}

const connection = mysql.createPool(DB_CONFIG)

module.exports = connection