import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./AbrirComanda.styles"; // Importe os estilos

const API_BASE_URL = "http://localhost:3001/api";

function AbrirComanda() {
  const navigate = useNavigate();
  const [cliente, setCliente] = useState("");
  const [telefone, setTelefone] = useState("");
  const [itens, setItens] = useState([{ produto: "", quantidade: 1 }]);
  const [cardapio, setCardapio] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCardapio = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cardapio`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCardapio(data);
      } catch (e) {
        console.error("Erro ao carregar cardápio:", e);
        setError("Erro ao carregar o cardápio.");
      }
    };

    fetchCardapio();
  }, []);

  const handleClienteChange = (event) => {
    setCliente(event.target.value);
  };

  const handleTelefoneChange = (event) => {
    setTelefone(event.target.value);
  };

  const handleItemChange = (index, field, value) => {
    const novosItens = [...itens];
    novosItens[index][field] = value;
    setItens(novosItens);
  };

  const handleAdicionarItem = () => {
    setItens([...itens, { produto: "", quantidade: 1 }]);
  };

  const handleRemoverItem = (index) => {
    const novosItens = [...itens];
    novosItens.splice(index, 1);
    setItens(novosItens);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cliente || !telefone) {
      alert("Por favor, preencha o nome do cliente e o telefone.");
      return;
    }

    const itensParaEnviar = itens.filter((item) => item.produto);

    if (itensParaEnviar.length === 0) {
      if (!window.confirm("Deseja abrir a comanda sem nenhum item inicial?")) {
        return;
      }
    }

    try {
      const response = await fetch(`${API_BASE_URL}/pedidos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cliente, telefone, itens: itensParaEnviar }),
      });

      if (response.status === 201) {
        const novaComanda = await response.json();
        navigate("/");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Erro ao abrir a comanda.");
      }
    } catch (error) {
      console.error("Erro ao abrir a comanda:", error);
      setError("Erro ao conectar com o servidor.");
    }
  };

  return (
    <S.PageContainer>
      <S.Title>Abrir Nova Comanda</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.FormGroup>
          <label htmlFor="cliente">Cliente:</label>
          <input
            type="text"
            id="cliente"
            value={cliente}
            onChange={handleClienteChange}
            required
          />
        </S.FormGroup>
        <S.FormGroup>
          <label htmlFor="telefone">Telefone:</label>
          <input
            type="number"
            id="telefone"
            value={telefone}
            onChange={handleTelefoneChange}
            required
          />
        </S.FormGroup>

        <S.ItemsSectionTitle>Itens Iniciais (Opcional)</S.ItemsSectionTitle>
        {itens.map((item, index) => (
          <S.ItemRow key={index}>
            <label htmlFor={`produto-${index}`}>Produto:</label>
            <select
              id={`produto-${index}`}
              value={item.produto}
              onChange={(e) =>
                handleItemChange(index, "produto", e.target.value)
              }
            >
              <option value="">Selecione um produto</option>
              {cardapio.map((produto) => (
                <option key={produto._id} value={produto._id}>
                  {produto.nome}
                </option>
              ))}
            </select>
            <label htmlFor={`quantidade-${index}`}>Quantidade:</label>
            <input
              type="number"
              id={`quantidade-${index}`}
              value={item.quantidade}
              onChange={(e) =>
                handleItemChange(index, "quantidade", parseInt(e.target.value))
              }
              min="1"
            />
            {itens.length > 1 && (
              <button type="button" onClick={() => handleRemoverItem(index)}>
                Remover
              </button>
            )}
          </S.ItemRow>
        ))}
        <S.AddItemButton type="button" onClick={handleAdicionarItem}>
          Adicionar Mais Item
        </S.AddItemButton>

        <S.SubmitButton type="submit">Abrir Comanda</S.SubmitButton>

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.Form>
    </S.PageContainer>
  );
}

export default AbrirComanda;
