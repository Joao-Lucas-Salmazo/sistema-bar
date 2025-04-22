import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as S from "./ListaProdutosPage.styles";

const API_BASE_URL = "http://localhost:3001/api";

function ListaProdutosPage() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cardapio`);
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

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/cardapio/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Produto excluído com sucesso!");
          // Atualização otimista da UI:
          setProdutos((prevProdutos) =>
            prevProdutos.filter((produto) => produto._id !== id)
          );
          // Não precisamos chamar fetchProdutos() imediatamente aqui
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Erro ao excluir o produto.");
        }
      } catch (error) {
        console.error("Erro ao excluir o produto:", error);
        alert("Erro ao conectar com o servidor para excluir o produto.");
      }
    }
  };

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  if (error) {
    return <div>Erro ao carregar produtos: {error.message}</div>;
  }

  return (
    <S.PageContainer>
      <S.Title>Lista de Produtos</S.Title>
      <S.AddProductButton to="/cadastro-produto">
        Cadastrar Novo Produto
      </S.AddProductButton>
      {produtos.length > 0 ? (
        <S.ProductList>
          {produtos.map((produto) => (
            <S.ProductItem key={produto._id}>
              <S.ProductName>{produto.nome}</S.ProductName>
              <S.ProductPrice>R$ {produto.preco.toFixed(2)}</S.ProductPrice>
              <S.DeleteButton onClick={() => handleDeleteProduct(produto._id)}>
                Excluir
              </S.DeleteButton>
            </S.ProductItem>
          ))}
        </S.ProductList>
      ) : (
        <S.EmptyMessage>Nenhum produto cadastrado ainda.</S.EmptyMessage>
      )}
    </S.PageContainer>
  );
}

export default ListaProdutosPage;
