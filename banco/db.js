// banco/db.js
const mysql = require('mysql2');

// Conectando ao banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',  // Certifique-se que o MySQL está rodando na sua máquina
  user: 'root',  // Verifique se o usuário é realmente 'root' (e se a senha está correta)
  password: '',  // Se você configurou uma senha, coloque-a aqui
  database: 'biblioteca_virtual'  // Nome do banco de dados que você está usando
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar: ' + err.stack);
    return;
  }
  console.log('Conectado ao banco de dados como id ' + connection.threadId);
});

module.exports = connection;