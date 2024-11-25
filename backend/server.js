//Eu NÃO AGUENTO MAIS, nem deus nem o diabo existem mais, inferno q da problema\\

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser'); // Middleware para tratar dados .JSON
const path = require('path'); // Biblioteca para manipulação de caminhos
const cors = require('cors'); // Middleware para habilitar CORS
const { getAllBooks, addBook, updateBook, deleteBook } = require('./function.js');

const app = express(); // Inicia Express
const port = process.env.PORT || 3001;

// Middleware para habilitar o uso de JSON
app.use(bodyParser.json());

// Habilitar CORS
app.use(cors());

// Middleware para servir os arquivos do frontend
app.use(express.static(path.join(__dirname, 'frontend'))); // Ajustado para garantir o caminho correto

// Rota para carregar a página principal do frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/landing-single.html'));
});

////////////////////////////////// Endpoints da API \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Endpoint para listar
app.get('/livros', async (req, res) => {
    try {
        const livros = await getAllBooks();
        res.json(livros); // Retorna os livros em formato .json
    } catch (err) {
        console.error('Erro ao buscar livros:', err);
        res.status(500).send('Erro ao buscar livros');
    }
});

// Endpoint para adicionar
app.post('/livros', async (req, res) => {
    const { titulo, autor, descricao, cpf_usuario } = req.body; // Extrai dados

    // Validação de campos
    if (!titulo || !autor || !cpf_usuario) {
        return res.status(400).send('Título, autor e CPF do usuário são obrigatórios!');
    }

    try {
        const result = await addBook(titulo, autor, descricao, cpf_usuario); // Adiciona
        res.status(201).json({
            message: 'Livro adicionado com sucesso!',
            id: result.insertId, // Id do livro inserido
        });
    } catch (err) {
        console.error('Erro ao adicionar livro:', err);
        res.status(500).send('Erro ao adicionar livro');
    }
});

// Endpoint para atualizar
app.put('/livros/:id', async (req, res) => {
    const { id } = req.params; // Obtém o ID do livro dos parâmetros da URL
    const { titulo, autor, descricao, cpf_usuario } = req.body; // Extrai novos dados

    // Validação obrigatória
    if (!titulo || !autor || !cpf_usuario) {
        return res.status(400).send('Título, autor e CPF do usuário são obrigatórios!');
    }

    try {
        const result = await updateBook(id, titulo, autor, descricao, cpf_usuario); // Atualiza o livro
        if (result.affectedRows === 0) {
            res.status(404).send('Livro não encontrado ou não pertence ao usuário');
        } else {
            res.status(200).send('Livro atualizado com sucesso!');
        }
    } catch (err) {
        console.error('Erro ao atualizar livro:', err);
        res.status(500).send('Erro ao atualizar livro');
    }
});

// Endpoint para deletar
app.delete('/livros/:id', async (req, res) => {
    const { id } = req.params; //ID do livro
    const { cpf_usuario } = req.body; //CPF do usuário

    // Verifica
    if (!cpf_usuario) {
        return res.status(400).send('CPF do usuário é obrigatório!');
    }

    try {
        const result = await deleteBook(id, cpf_usuario); // Deleta o livro
        if (result.affectedRows === 0) {
            res.status(404).send('Livro não encontrado ou não pertence ao usuário');
        } else {
            res.status(200).send('Livro deletado com sucesso!');
        }
    } catch (err) {
        console.error('Erro ao deletar livro:', err); // Mostra erros ao deletar
        res.status(500).send('Erro ao deletar livro');
    }
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`); // Precaução
});