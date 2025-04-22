import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./CadastroProduto.styles";

const API_BASE_URL = "http://localhost:3001/api";

function CadastroProduto() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nome || !descricao || !preco || !categoria) {
      setError("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/cardapio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          descricao,
          preco: parseFloat(preco),
          categoria,
          imagem,
        }),
      });

      if (response.status === 201) {
        alert("Produto cadastrado com sucesso!");
        navigate("/lista-produtos");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erro ao cadastrar o produto.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar o produto:", error);
      setError("Erro ao conectar com o servidor.");
    }
  };

  const handleCancelar = () => {
    navigate("/lista-produtos");
  };

  return (
    <S.PageContainer>
      <S.FormContainer>
        <S.Title>Cadastrar Novo Produto</S.Title>
        <form onSubmit={handleSubmit}>
          <S.FormGroup>
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </S.FormGroup>
          <S.FormGroup>
            <label htmlFor="descricao">Descrição:</label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </S.FormGroup>
          <S.FormGroup>
            <label htmlFor="preco">Preço:</label>
            <input
              type="number"
              id="preco"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              required
              step="0.01"
            />
          </S.FormGroup>
          <S.FormGroup>
            <label htmlFor="categoria">Categoria:</label>
            <input
              type="text"
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            />
          </S.FormGroup>
          <S.FormGroup>
            <label htmlFor="imagem">Imagem (Opcional):</label>
            <input
              type="text"
              id="imagem"
              value={imagem}
              onChange={(e) => setImagem(e.target.value)}
            />
          </S.FormGroup>
          {error && <p className="error-message">{error}</p>}
          <S.ButtonContainer>
            <S.SubmitButton type="submit">Cadastrar</S.SubmitButton>
            <S.CancelButton type="button" onClick={handleCancelar}>
              Cancelar
            </S.CancelButton>
          </S.ButtonContainer>
        </form>
      </S.FormContainer>
    </S.PageContainer>
  );
}

export default CadastroProduto;
