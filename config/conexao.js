const mysql = require('mysql2/promise');

const conexao = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sg_relaxe',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = conexao;