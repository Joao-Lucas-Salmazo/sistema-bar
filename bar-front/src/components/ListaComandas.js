import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:3001/api";

function ListaComandas() {
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
    <div>
      <h2>Lista de Comandas</h2>
      <Link to="/abrir-comanda">
        <button>Abrir Nova Comanda</button>
      </Link>
      {comandas.length > 0 ? (
        <ul>
          {comandas.map((comanda) => (
            <li key={comanda._id}>
              Comanda #{comanda._id} - Cliente: {comanda.cliente} (
              <Link to={`/comandas/${comanda._id}`}>Ver Detalhes</Link>)
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma comanda aberta ainda.</p>
      )}
    </div>
  );
}

export default ListaComandas;
