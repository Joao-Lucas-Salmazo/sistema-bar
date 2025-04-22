import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as S from "./ComandaDetalhe.styles"; // Importe os estilos

const API_BASE_URL = "http://localhost:3001/api";

function ComandaDetalhe() {
  const { id } = useParams();
  const [comanda, setComanda] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cardapio, setCardapio] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidadeAdicionar, setQuantidadeAdicionar] = useState(1);
  const navigate = useNavigate();

  const fetchComandaDetalhe = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/pedidos/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setComanda(data);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchComandaDetalhe();
  }, [fetchComandaDetalhe]);

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
        setError(
          error
            ? `${error.message} e erro ao carregar cardápio`
            : "Erro ao carregar cardápio"
        );
      }
    };

    fetchCardapio();
  }, []);

  const handleVoltar = () => {
    navigate("/");
  };

  const handleAdicionarItem = async () => {
    if (!produtoSelecionado) {
      alert("Por favor, selecione um produto.");
      return;
    }

    try {
      const produtoNoCardapio = cardapio.find(
        (p) => p._id === produtoSelecionado
      );

      if (!produtoNoCardapio) {
        alert("Produto selecionado não encontrado no cardápio.");
        return;
      }

      const novoItem = {
        produto: produtoSelecionado,
        quantidade: parseInt(quantidadeAdicionar),
        nome: produtoNoCardapio.nome,
        preco: produtoNoCardapio.preco,
      };

      const novaListaDeItens = comanda.itens
        ? [...comanda.itens, novoItem]
        : [novoItem];

      const response = await fetch(`${API_BASE_URL}/pedidos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itens: novaListaDeItens,
        }),
      });

      if (response.ok) {
        const updatedComanda = await response.json();
        setComanda(updatedComanda);
        setProdutoSelecionado("");
        setQuantidadeAdicionar(1);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erro ao adicionar item ao pedido.");
      }
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  const atualizarQuantidadeItem = async (itemId, novaQuantidade) => {
    try {
      const response = await fetch(`${API_BASE_URL}/pedidos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itens: [{ _id: itemId, quantidade: novaQuantidade }],
        }),
      });

      if (response.ok) {
        const updatedComanda = await response.json();
        setComanda(updatedComanda);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erro ao atualizar a quantidade do item.");
      }
    } catch (error) {
      console.error("Erro ao atualizar a quantidade:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  const removerItem = async (itemId) => {
    const novaListaItensParaEnviar = comanda.itens.filter(
      (item) => item._id !== itemId
    );

    try {
      const response = await fetch(`${API_BASE_URL}/pedidos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itens: novaListaItensParaEnviar,
        }),
      });

      if (response.ok) {
        const updatedComanda = await response.json();
        setComanda({ ...updatedComanda });
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erro ao remover o item do pedido.");
        fetchComandaDetalhe();
      }
    } catch (error) {
      console.error("Erro ao remover o item:", error);
      alert("Erro ao conectar com o servidor.");
      fetchComandaDetalhe();
    }
  };

  const aumentarQuantidade = (itemId) => {
    const itemParaAtualizar = comanda.itens.find((item) => item._id === itemId);
    if (itemParaAtualizar) {
      atualizarQuantidadeItem(itemId, itemParaAtualizar.quantidade + 1);
    }
  };

  const diminuirQuantidade = (itemId) => {
    const itemParaAtualizar = comanda.itens.find((item) => item._id === itemId);
    if (itemParaAtualizar && itemParaAtualizar.quantidade > 1) {
      atualizarQuantidadeItem(itemId, itemParaAtualizar.quantidade - 1);
    } else if (itemParaAtualizar && itemParaAtualizar.quantidade === 1) {
      if (window.confirm("Deseja remover este item do pedido?")) {
        removerItem(itemId);
      }
    }
  };

  const handleExcluirComanda = async () => {
    if (window.confirm("Tem certeza que deseja excluir esta comanda?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/pedidos/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          alert("Comanda excluída com sucesso!");
          navigate("/"); // Redirecionar para a lista de comandas
        } else {
          const errorData = await response.json();
          alert(errorData.message || "Erro ao excluir a comanda.");
        }
      } catch (error) {
        console.error("Erro ao excluir a comanda:", error);
        alert("Erro ao conectar com o servidor para excluir a comanda.");
      }
    }
  };

  if (loading) {
    return <div>Carregando detalhes da comanda...</div>;
  }

  if (error) {
    return <div>Erro ao carregar detalhes da comanda: {error.message}</div>;
  }

  if (!comanda) {
    return <div>Comanda não encontrada.</div>;
  }

  return (
    <S.PageContainer>
      <S.Title>Comanda #{comanda._id}</S.Title>
      <S.InfoParagraph>Cliente: {comanda.cliente}</S.InfoParagraph>
      <S.InfoParagraph>Telefone: {comanda.telefone}</S.InfoParagraph>

      <S.ItemsSectionTitle>Itens do Pedido</S.ItemsSectionTitle>
      {comanda?.itens?.length > 0 ? (
        <S.ItemsList>
          {[...comanda.itens].map((item) => (
            <S.ItemRow key={item._id}>
              <S.ItemName>{item.nome}</S.ItemName>
              <S.QuantityControls>
                <button onClick={() => diminuirQuantidade(item._id)}>-</button>
                <span>{item.quantidade}</span>
                <button onClick={() => aumentarQuantidade(item._id)}>+</button>
              </S.QuantityControls>
              <span>R$ {(item.produto?.preco || 0).toFixed(2)}</span>
            </S.ItemRow>
          ))}
        </S.ItemsList>
      ) : (
        <p>Nenhum item adicionado a esta comanda ainda.</p>
      )}

      <S.TotalParagraph>
        <strong>Total: R$ {(comanda?.total || 0).toFixed(2)}</strong>
      </S.TotalParagraph>
      <S.StatusParagraph>Status: {comanda?.status}</S.StatusParagraph>
      <S.DateParagraph>
        Data de Abertura: {new Date(comanda?.data).toLocaleString()}
      </S.DateParagraph>

      <S.ActionButtons>
        <button onClick={handleVoltar}>Voltar para Comandas</button>
        <button onClick={handleExcluirComanda}>Excluir Comanda</button>
      </S.ActionButtons>

      <S.ItemsSectionTitle>Adicionar Item</S.ItemsSectionTitle>
      <S.AddItemForm onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="produto">Produto:</label>
        <select
          id="produto"
          value={produtoSelecionado}
          onChange={(e) => setProdutoSelecionado(e.target.value)}
        >
          <option value="">Selecione um produto</option>
          {cardapio.map((produto) => (
            <option key={produto._id} value={produto._id}>
              {produto.nome}
            </option>
          ))}
        </select>
        <label htmlFor="quantidade">Quantidade:</label>
        <input
          type="number"
          id="quantidade"
          value={quantidadeAdicionar}
          onChange={(e) => setQuantidadeAdicionar(e.target.value)}
          min="1"
        />
        <button type="button" onClick={handleAdicionarItem}>
          Adicionar Item
        </button>
      </S.AddItemForm>
    </S.PageContainer>
  );
}

export default ComandaDetalhe;
