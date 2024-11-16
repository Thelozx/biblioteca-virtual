//Qnd for pro banco eu mudo
//aqui é onde as informaçao passa

const express = require("express");
const { readJSON, writeJSON, livrosPath, usuariosPath } = require("./function");
const app = express();

app.use(express.json()); //processa json

// porta
const PORT = 3001;

//Pega livros
app.get("/livros/:userId", (req, res) => { 
    const { userId } = req.params;
    const livros = readJSON(livrosPath).filter(livro => livro.userId == userId);
    res.json(livros);
});

//Coloca os livros
app.post("/livros", (req, res) => {
    const livros = readJSON(livrosPath);
    const novoLivro = {
        id: livros.length + 1,
        ...req.body // Dados enviados pelo cliente
    };
    livros.push(novoLivro);
    writeJSON(livrosPath, livros);
    res.status(201).json(novoLivro);
});

//Atualiza
app.put("/livros/:id", (req, res) => {
    const { id } = req.params;
    const livros = readJSON(livrosPath);
    const livroIndex = livros.findIndex(livro => livro.id == id);

    if (livroIndex !== -1) {
        livros[livroIndex] = { ...livros[livroIndex], ...req.body };
        writeJSON(livrosPath, livros);
        res.json(livros[livroIndex]);
    } else {
        res.status(404).json({ error: "Livro não encontrado" });
    }
});

//Apaga
app.delete("/livros/:id", (req, res) => {
    const { id } = req.params;
    let livros = readJSON(livrosPath);
    livros = livros.filter(livro => livro.id != id);

    writeJSON(livrosPath, livros);
    res.status(204).end();
});

//me falaram q inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});