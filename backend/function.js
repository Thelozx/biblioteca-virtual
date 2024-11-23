const db = require("./db.js");

// Busca todos os livros
async function getAllBooks() {
    const [rows] = await db.query("SELECT * FROM livro");
    return rows;
}

// Insere um novo livro
async function addBook(titulo, autor, descricao, cpfUsuario) {
    const query = `
        INSERT INTO livro (titulo, autor, descricao, cpf_usuario)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [titulo, autor, descricao, cpfUsuario]);
    return result;
}

// Exporta as funções para serem usadas no server.js
module.exports = {
    getAllBooks,
    addBook,
};
