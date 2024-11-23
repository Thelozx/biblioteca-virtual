const express = require("express");
const { getAllBooks, addBook } = require("./function.js");

const app = express();
app.use(express.json()); // Permite processar JSON no corpo da requisição

// Rota para listar livros
app.get("/api/livros", async (req, res) => {
    try {
        const livros = await getAllBooks();
        res.status(200).json(livros);
    } catch (err) {
        res.status(500).send("Erro ao buscar livros.");
    }
});

// Rota para adicionar livro
app.post("/api/livros", async (req, res) => {
    const { titulo, autor, descricao, cpfUsuario } = req.body;
    try {
        await addBook(titulo, autor, descricao, cpfUsuario);
        res.status(201).send("Livro adicionado com sucesso.");
    } catch (err) {
        res.status(500).send("Erro ao adicionar livro.");
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
