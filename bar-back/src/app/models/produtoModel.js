import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  preco: { type: Number, required: true },
  descricao: String,
  // Você pode adicionar mais campos conforme necessário (categoria, etc.)
});

const Produto = mongoose.model("Produto", produtoSchema);

export default Produto;
