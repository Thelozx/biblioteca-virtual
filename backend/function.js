// Funções auxiliares para interagir com o banco, e operações relacionadas com a tabela livro \\
const db = require("./db.js");

// Busca todos os livros
async function getAllBooks() {
    const [rows] = await db.query("SELECT * FROM livro");
    return rows; // Retorna todos os livros
}

// Insere um novo livro
async function addBook(titulo, autor, descricao, cpfUsuario) {
    const query = `
        INSERT INTO livro (titulo, autor, descricao, cpf_usuario)
        VALUES (?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [titulo, autor, descricao, cpfUsuario]);
    return result; // Retorna informações sobre o novo livro
}

// Atualiza um livro
async function updateBook(id, titulo, autor, descricao, cpfUsuario) {
    const query = `
        UPDATE livro
        SET titulo = ?, autor = ?, descricao = ?
        WHERE id = ? AND cpf_usuario = ?
    `;
    const [result] = await db.query(query, [titulo, autor, descricao, id, cpfUsuario]);
    return result; // Retorna as informações da atualização
}

// Remove um livro
async function deleteBook(id, cpfUsuario) {
    const query = `
        DELETE FROM livro
        WHERE id = ? AND cpf_usuario = ?
    `;
    const [result] = await db.query(query, [id, cpfUsuario]);
    return result; // Retorna o status da remoção
}

// Exporta as funções
module.exports = {
    getAllBooks,
    addBook,
    updateBook,
    deleteBook,
};
