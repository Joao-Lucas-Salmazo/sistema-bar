import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

function Home() {
  const [comandasAbertas, setComandasAbertas] = useState([]);
  const [exibirFormularioNovaComanda, setExibirFormularioNovaComanda] =
    useState(false);
  const [nomeCliente, setNomeCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");
  const navigate = useNavigate(); // Hook para navegar entre rotas

  useEffect(() => {
    // Aqui você faria a chamada para a API para buscar as comandas abertas
    // Exemplo de dados fictícios:
    const comandas = [
      { id: 1, cliente: "João Silva" },
      { id: 2, cliente: "Maria Oliveira" },
    ];
    setComandasAbertas(comandas);
  }, []);

  const handleAbrirFormulario = () => {
    setExibirFormularioNovaComanda(true);
  };

  const handleFecharFormulario = () => {
    setExibirFormularioNovaComanda(false);
    setNomeCliente("");
    setTelefoneCliente("");
  };

  const handleNomeChange = (event) => {
    setNomeCliente(event.target.value);
  };

  const handleTelefoneChange = (event) => {
    setTelefoneCliente(event.target.value);
  };

  const handleCriarComanda = async () => {
    if (nomeCliente && telefoneCliente) {
      // Aqui você faria a chamada POST para a sua API para criar uma nova comanda
      const novaComanda = { nome: nomeCliente, telefone: telefoneCliente };
      console.log("Criando comanda:", novaComanda);
      // Supondo que a API retorne o ID da nova comanda
      const novaComandaId = Math.floor(Math.random() * 100) + 3;
      navigate(`/comanda/${novaComandaId}`); // Navega para a página da comanda
      handleFecharFormulario();
    } else {
      alert("Nome e telefone são obrigatórios.");
    }
  };

  return (
    <div>
      <h2>Comandas Abertas</h2>
      <ul>
        {comandasAbertas.map((comanda) => (
          <li key={comanda.id}>
            <Link to={`/comanda/${comanda.id}`}>
              Comanda #{comanda.id} - {comanda.cliente}
            </Link>{" "}
            {/* Usando Link */}
          </li>
        ))}
      </ul>
      <button onClick={handleAbrirFormulario}>Abrir Nova Comanda</button>

      {exibirFormularioNovaComanda && (
        <div>
          <h3>Nova Comanda</h3>
          <label>Nome:</label>
          <input type="text" value={nomeCliente} onChange={handleNomeChange} />
          <label>Telefone:</label>
          <input
            type="text"
            value={telefoneCliente}
            onChange={handleTelefoneChange}
          />
          <button onClick={handleCriarComanda}>Criar Comanda</button>
          <button onClick={handleFecharFormulario}>Cancelar</button>
        </div>
      )}
    </div>
  );
}

export default Home;
