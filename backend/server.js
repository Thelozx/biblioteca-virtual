//Eu NÃO AGUENTO MAIS, nem deus nem o diabo existem mais, inferno q da problema\\
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getAllBooks, addBook, updateBook, deleteBook } = require('./function.js');

const app = express();
const port = process.env.PORT || 4000;

// Middleware para habilitar o uso de JSON
app.use(bodyParser.json());

// Habilitar CORS
app.use(cors());

// Endpoints da API

// Endpoint para listar livros
app.get('/livros', async (req, res) => {
    try {
        const livros = await getAllBooks();
        res.json(livros);
    } catch (err) {
        console.error(`Erro ao buscar livros: ${err.message}`);
        res.status(500).send('Erro ao buscar livros');
    }
});

// Endpoint para adicionar um livro
app.post('/livros', async (req, res) => {
    const { titulo, autor, descricao, cpf_usuario } = req.body;

    if (!titulo || !autor || !cpf_usuario) {
        return res.status(400).send('Título, autor e CPF do usuário são obrigatórios!');
    }

    try {
        const result = await addBook(titulo, autor, descricao, cpf_usuario);
        res.status(201).json({
            message: 'Livro adicionado com sucesso!',
            id: result.insertId,
        });
    } catch (err) {
        console.error(`Erro ao adicionar livro: ${err.message}`);
        res.status(500).send('Erro ao adicionar livro');
    }
});

// Endpoint para atualizar um livro
app.put('/livros/:id', async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, descricao, cpf_usuario } = req.body;

    if (!titulo || !autor || !cpf_usuario) {
        return res.status(400).send('Título, autor e CPF do usuário são obrigatórios!');
    }

    try {
        const result = await updateBook(id, titulo, autor, descricao, cpf_usuario);
        if (result.affectedRows === 0) {
            res.status(404).send('Livro não encontrado ou não pertence ao usuário');
        } else {
            res.status(200).send('Livro atualizado com sucesso!');
        }
    } catch (err) {
        console.error(`Erro ao atualizar livro: ${err.message}`);
        res.status(500).send('Erro ao atualizar livro');
    }
});

// Endpoint para deletar um livro
app.delete('/livros/:id', async (req, res) => {
    const { id } = req.params;
    const { cpf_usuario } = req.body;

    if (!cpf_usuario) {
        return res.status(400).send('CPF do usuário é obrigatório!');
    }

    try {
        const result = await deleteBook(id, cpf_usuario);
        if (result.affectedRows === 0) {
            res.status(404).send('Livro não encontrado ou não pertence ao usuário');
        } else {
            res.status(200).send('Livro deletado com sucesso!');
        }
    } catch (err) {
        console.error(`Erro ao deletar livro: ${err.message}`);
        res.status(500).send('Erro ao deletar livro');
    }
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
