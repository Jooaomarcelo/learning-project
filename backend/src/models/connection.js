// Configurar a conexão com o banco de dados

const mysql = require('mysql2/promise');

require('dotenv').config();

const connection = mysql.createPool(
    {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE
    }
);

module.exports = connection;