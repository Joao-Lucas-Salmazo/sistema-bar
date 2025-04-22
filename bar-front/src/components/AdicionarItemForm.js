import React from "react";

function AdicionarItemForm({ cardapio, onAdicionar }) {
  const [itemId, setItemId] = React.useState("");
  const [quantidade, setQuantidade] = React.useState(1);

  const handleItemChange = (event) => {
    setItemId(event.target.value);
  };

  const handleQuantidadeChange = (event) => {
    setQuantidade(parseInt(event.target.value, 10) || 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (itemId) {
      onAdicionar(itemId, quantidade);
      setItemId("");
      setQuantidade(1);
    } else {
      alert("Selecione um item.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="item">Item:</label>
      <select id="item" value={itemId} onChange={handleItemChange}>
        <option value="">Selecione um item</option>
        {cardapio.map((item) => (
          <option key={item.id} value={item.id}>
            {item.nome} (R$ {item.preco.toFixed(2)})
          </option>
        ))}
      </select>

      <label htmlFor="quantidade">Quantidade:</label>
      <input
        type="number"
        id="quantidade"
        value={quantidade}
        onChange={handleQuantidadeChange}
        min="1"
      />

      <button type="submit">Adicionar</button>
    </form>
  );
}

export default AdicionarItemForm;
