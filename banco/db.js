// banco/db.js
const mysql = require('mysql2');

// Conectando ao banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',  // Certifique-se que o MySQL está rodando na sua máquina usando essa configuração
  user: 'root',  // usuario basicp
  password: '',  // Sem senha
  database: 'biblioteca_virtual'  // Nome do banco de dados
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como id ' + connection.threadId);
});

module.exports = connection;