require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Configuração do banco de dados
const connection = mysql.createConnection({
    host: 'mysql_container', // Nome do serviço no docker-compose
    user: 'root',            // Usuário do MySQL
    password: '',       // Senha definida no MySQL
    database: 'biblioteca_virtual' // Nome do banco
});

// Teste
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão ao banco de dados bem-sucedida!');
    }
});

// Middleware
app.use(bodyParser.json());

//////////////////////////////////////////////////////////////////////////////////////////////////////////

//Adiciona
app.post('/livros', (req, res) => {
    const { titulo, autor, id_usuario } = req.body;
    const query = 'INSERT INTO livros (titulo, autor, id_usuario) VALUES (?, ?, ?)';
    connection.query(query, [titulo, autor, id_usuario], (err, results) => {
        if (err) {
            console.error('Erro ao adicionar livro:', err);
            res.status(500).send('Erro ao adicionar livro');
        } else {
            res.status(201).send('Livro adicionado com sucesso!');
        }
    });
});

//Listar
app.get('/livros', (req, res) => {
    const { id_usuario } = req.query; // Espera o ID do usuário na query string
    const query = 'SELECT * FROM livros WHERE id_usuario = ?';
    connection.query(query, [id_usuario], (err, results) => {
        if (err) {
            console.error('Erro ao buscar livros:', err);
            res.status(500).send('Erro ao buscar livros');
        } else {
            res.json(results);
        }
    });
});

//Altera
app.put('/livros/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, id_usuario } = req.body;

    const query = 'UPDATE livros SET titulo = ?, autor = ? WHERE id = ? AND id_usuario = ?';
    connection.query(query, [titulo, autor, id, id_usuario], (err, results) => {
        if (err) {
            console.error('Erro ao alterar livro:', err);
            res.status(500).send('Erro ao alterar livro');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Livro não encontrado ou não pertence ao usuário');
        } else {
            res.status(200).send('Livro alterado com sucesso!');
        }
    });
});

//Deleta
app.delete('/livros/:id', (req, res) => {
    const { id } = req.params;
    const { id_usuario } = req.body;

    const query = 'DELETE FROM livros WHERE id = ? AND id_usuario = ?';
    connection.query(query, [id, id_usuario], (err, results) => {
        if (err) {
            console.error('Erro ao deletar livro:', err);
            res.status(500).send('Erro ao deletar livro');
        } else if (results.affectedRows === 0) {
            res.status(404).send('Livro não encontrado ou não pertence ao usuário');
        } else {
            res.status(200).send('Livro deletado com sucesso!');
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
