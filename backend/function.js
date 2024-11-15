// backend/function.js
const express = require('express');
const connection = require('../banco/db');  // Importa a conexão com o banco de dados
const app = express();

// Configura o servidor para aceitar JSON (caso queira enviar/receber dados em formato JSON)
app.use(express.json());

// Rota para retornar todos os livros do banco de dados (Exemplo)
app.get('/livros', (req, res) => {
  connection.query('SELECT * FROM livros', (err, results) => {
    if (err) {
      console.error('Erro ao acessar a tabela de livros: ', err);
      return res.status(500).send('Erro ao acessar o banco de dados');
    }
    res.json(results);  // Retorna os resultados em formato JSON
  });
});

// Rota inicial
app.get('/', (req, res) => {
  res.send('Servidor backend está funcionando!');
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor backend rodando na porta 3000');
});
