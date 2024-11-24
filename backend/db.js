// Intermediário entre o backend e o banco de dados \\

// Carrega variáveis de ambiente do .env
require("dotenv").config();
const mysql = require("mysql2");

// Configura o pool de conexão com o banco de dados
const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost", // Nome do host (no Docker será 'db')
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "biblioteca_virtual",
    port: process.env.DB_PORT || 3306, // Porta do banco
    waitForConnections: true,          // Gerencia fila de conexões
    connectionLimit: 10,               // Limite de conexões simultâneas
    queueLimit: 0                      // Sem limite para fila de conexões
});

// Testa a conexão ao inicializar o pool
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
        console.log("Conexão com o banco de dados bem-sucedida!");
        connection.release(); // Libera a conexão após o teste
    }
});

// Exporta o pool com suporte a Promises para uso no backend
module.exports = pool.promise();
