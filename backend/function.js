//
const fs = require("fs"); //File system socilitado 
const path = require("path");

// Caminho dos arquivos JSON
const livrosPath = path.join(__dirname, "livros.json");
const usuariosPath = path.join(__dirname, "usuarios.json");

// Função para ler arquivos JSON
function readJSON(filePath) { //Caminho do arquivo
    return JSON.parse(fs.readFileSync(filePath, "utf8")); //ler arquivos de forma sincronizada
}

// Função para escrever arquivos JSON
function writeJSON(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

module.exports = {
    readJSON,
    writeJSON,
    livrosPath,
    usuariosPath
};