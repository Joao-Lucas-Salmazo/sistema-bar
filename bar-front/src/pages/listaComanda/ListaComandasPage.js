import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as S from "./ListaComandasPage.styles"; // Caminho atualizado

const API_BASE_URL = "http://localhost:3001/api";

function ListaComandasPage() {
  const [comandas, setComandas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComandas = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/pedidos`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setComandas(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchComandas();
  }, []);

  if (loading) {
    return <div>Carregando comandas...</div>;
  }

  if (error) {
    return <div>Erro ao carregar comandas: {error.message}</div>;
  }

  return (
    <S.PageContainer>
      <S.Title>Lista de Comandas</S.Title>
      <S.NewComandaButton to="/abrir-comanda">
        Abrir Nova Comanda
      </S.NewComandaButton>
      {comandas.length > 0 ? (
        <S.ComandasList>
          {comandas.map((comanda) => (
            <S.ComandaItem key={comanda._id}>
              <S.ComandaInfo>
                Comanda #{comanda._id} - Cliente: {comanda.cliente}
              </S.ComandaInfo>
              <S.DetailsLink to={`/comanda/${comanda._id}`}>
                Ver Detalhes
              </S.DetailsLink>
            </S.ComandaItem>
          ))}
        </S.ComandasList>
      ) : (
        <S.EmptyMessage>Nenhuma comanda aberta ainda.</S.EmptyMessage>
      )}
    </S.PageContainer>
  );
}

export default ListaComandasPage;
