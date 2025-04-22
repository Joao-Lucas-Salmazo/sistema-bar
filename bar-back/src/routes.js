import express from "express";
const router = express.Router();

// Importar os controladores
import {
  listarCardapio,
  obterItemCardapio,
  adicionarItemCardapio,
  atualizarItemCardapio,
  removerItemCardapio,
} from "./app/controllers/cardapioController.js";

import {
  listarPedidos,
  obterPedido,
  criarPedido,
  atualizarPedido,
  removerPedido,
} from "./app/controllers/pedidosController.js";

import {
  listarProdutos,
  obterProduto,
  adicionarProduto,
  atualizarProduto,
  removerProduto,
} from "./app/controllers/produtoController.js";

// Rotas do Cardápio
router.get("/cardapio", listarCardapio);
router.get("/cardapio/:id", obterItemCardapio);
router.post("/cardapio", adicionarItemCardapio);
router.put("/cardapio/:id", atualizarItemCardapio);
router.delete("/cardapio/:id", removerItemCardapio);

// Rotas dos Pedidos
router.get("/pedidos", listarPedidos);
router.get("/pedidos/:id", obterPedido);
router.post("/pedidos", criarPedido);
router.put("/pedidos/:id", atualizarPedido);
router.delete("/pedidos/:id", removerPedido);

// Rotas de Produtos
router.get("/produtos", listarProdutos);
router.get("/produtos/:id", obterProduto); // Opcional por enquanto
router.post("/produtos", adicionarProduto);
router.put("/produtos/:id", atualizarProduto);
router.delete("/produtos/:id", removerProduto);

export default router;
