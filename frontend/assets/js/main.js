import React, { useEffect, useState } from 'react';

export default function Main() {
    const [livros, setLivros] = useState([]);
    const [novoLivro, setNovoLivro] = useState({ titulo: '', autor: '' });

    useEffect(() => {
        fetch('http://localhost:3001/livros')
            .then((response) => response.json())
            .then((data) => setLivros(data))
            .catch((error) => console.error('Erro ao buscar livros:', error));
    }, []);

    const adicionarLivro = (e) => {
        e.preventDefault();
        fetch('http://localhost:3001/livros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoLivro),
        })
            .then((response) => {
                if (!response.ok) throw new Error('Erro ao adicionar livro');
                return response.json();
            })
            .then((data) => {
                alert(data.message);
                setLivros([...livros, novoLivro]);
                setNovoLivro({ titulo: '', autor: '' });
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <h1>Lista de Livros</h1>
            <ul>
                {livros.map((livro) => (
                    <li key={livro.id}>{livro.titulo} - {livro.autor}</li>
                ))}
            </ul>
            <h2>Adicionar Novo Livro</h2>
            <form onSubmit={adicionarLivro}>
                <input
                    type="text"
                    placeholder="Título"
                    value={novoLivro.titulo}
                    onChange={(e) => setNovoLivro({ ...novoLivro, titulo: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Autor"
                    value={novoLivro.autor}
                    onChange={(e) => setNovoLivro({ ...novoLivro, autor: e.target.value })}
                />
                <button type="submit">Adicionar</button>
            </form>
        </div>
    );
}
