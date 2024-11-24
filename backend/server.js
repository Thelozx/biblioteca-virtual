// Configurações iniciais e midewares \\

require('dotenv').config(); // Carrega variaveis no arquivo .env
const express = require('express'); // Framework para construir APIs
const bodyParser = require('body-parser'); // Mideware para tratar dados .JSON no corpo da requisição
const { getAllBooks, addBook, updateBook, deleteBook } = require('./function.js'); // Importa funções auxiliares
const app = express(); // Inicia a aplicação Express
const port = process.env.PORT || 3000;

// Mideware para habilitar o uso de JSON no corpo da requisição
app.use(bodyParser.json());

////////////////////////////////// Endpoints da API \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// Endpoint para listar todos os livros de todos os usuarios
app.get('/livros', async (req, res) => {
    try {
        const livros = await getAllBooks(); // Busca todos os livros no banco
        res.json(livros); // Retorna os livros em formato .JSON
    } catch (err) {
        console.error('Erro ao buscar livros:', err);
        res.status(500).send('Erro ao buscar livros');
    }
});

// Endpoint para adicionar um novo livro
app.post('/livros', async (req, res) => {
    const { titulo, autor, descricao, cpf_usuario } = req.body; // Extrai dados do corpo

    // Validação de campos obrigatorios
    if (!titulo || !autor || !cpf_usuario) {
        return res.status(400).send('Título, autor e CPF do usuário são obrigatórios!');
    }

    try {
        const result = await addBook(titulo, autor, descricao, cpf_usuario); // Adiciona o livro
        res.status(201).json({
            message: 'Livro adicionado com sucesso!',
            id: result.insertId, // ID do livro inserido
        });
    } catch (err) {
        console.error('Erro ao adicionar livro:', err);
        res.status(500).send('Erro ao adicionar livro');
    }
});

// Endpoint para atualizar informações de um livro
app.put('/livros/:id', async (req, res) => {
    const { id } = req.params; // Obtem o id do livro dos parametros da URL
    const { titulo, autor, descricao, cpf_usuario } = req.body; // Extrai novos dados do corpo da requisição

    // Validação de campos obrigatorios
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

// Endpoint para deletar um livro
app.delete('/livros/:id', async (req, res) => {
    const { id } = req.params; // Obtem o id do livro dos paramatros da URL
    const { cpf_usuario } = req.body; // Obtém o CPF do usuário

    // Verifica se o CPF do usuário foi enviado
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
        console.error('Erro ao deletar livro:', err); // mpstra erros ao deletar
        res.status(500).send('Erro ao deletar livro');
    }
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`); // Mensagem indicando que o servidor está ativo
});
