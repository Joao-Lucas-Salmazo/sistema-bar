import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  telefone: { type: Number, required: true },
  itens: [
    {
      produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cardapio",
        required: true,
      }, // Referencia ao model de Cardapio
      quantidade: { type: Number, required: true },
      nome: { type: String, required: true }, //duplicando o nome para fácil acesso
      preco: { type: Number, required: true }, //duplicando o preço para fácil acesso
    },
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["Novo", "Em Preparo", "Entregue", "Cancelado"],
    default: "Novo",
  },
  data: { type: Date, default: Date.now },
});

export default pedidoSchema;
