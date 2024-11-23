require("dotenv").config(); // Certifique-se de que o dotenv está instalado; O dotenv gerenciar as variáveis de ambiente

const mysql = require("mysql2");

// Configura o pool de conexão com o banco de dados
const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost", // Nome do host (no Docker será 'db')
    user: process.env.DB_USER || "root",      // Usuário do banco
    password: process.env.DB_PASSWORD || "",  // Senha do banco
    database: process.env.DB_NAME || "biblioteca_virtual", // Nome do banco
    port: process.env.DB_PORT || 3306         // Porta do banco
});

pool.getConnection((err) => { //Confirmação de resposta
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
        console.log("Conexão com o banco de dados bem-sucedida!");
    }
});

// Exporta a pool para ser usada em outras partes do backend
module.exports = pool.promise();

