const express = require('express');
const db = require('./db'); // Importa o arquivo db.js
const app = express();

app.use(express.urlencoded({ extended: true }));

app.post('/adicionar-dados', (req, res) => {
  const nome = req.body.nome;

  db.inserirUsuario(nome, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao salvar os dados.');
    } else {
      res.send('Usuário salvo com sucesso!');
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});