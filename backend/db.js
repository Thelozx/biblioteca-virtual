const mysql = require('mysql2'); // Importa a biblioteca mysql2

const pool = mysql.createPool({
    host: 'localhost', 
    user: 'root',
    password: '',
    database: 'biblioteca_virtual', //Mudar para o nome do seu banco
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão bem-sucedida ao banco de dados');
        connection.release(); // Libera a conexão após o teste
    }
});

module.exports = pool.promise();