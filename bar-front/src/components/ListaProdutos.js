import React, { useState, useEffect } from "react";

function ListaProdutos({ onEditarProduto, onExcluirProduto }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch("/api/produtos"); // Sua URL da API para listar produtos
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProdutos(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  if (error) {
    return <div>Erro ao carregar produtos: {error.message}</div>;
  }

  return (
    <div>
      <h3>Lista de Produtos</h3>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id}>
            {produto.nome} - R$ {produto.preco.toFixed(2)}
            {produto.descricao && ` (${produto.descricao})`}
            <button onClick={() => onEditarProduto(produto)}>Editar</button>
            <button onClick={() => onExcluirProduto(produto.id)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaProdutos;
