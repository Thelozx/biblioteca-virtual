const mysql = require("mysql2"); // Cria a conexão com o banco de dados

const pool = mysql.createPool({
    host: "db",
    user: "root",
    password: "",
    database: "biblioteca-virtual",
});

// Exporta a pool para ser usada nos outros arquivos
module.exports = pool.promise();