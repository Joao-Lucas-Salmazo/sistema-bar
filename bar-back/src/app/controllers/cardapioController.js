import Cardapio from "../models/Cardapio.js";

// Função para listar todos os itens do cardápio
const listarCardapio = async (req, res) => {
  try {
    const cardapio = await Cardapio.find();
    res.json(cardapio);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Função para obter um item do cardápio por ID
const obterItemCardapio = async (req, res) => {
  try {
    const item = await Cardapio.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item não encontrado" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Função para adicionar um novo item ao cardápio
const adicionarItemCardapio = async (req, res) => {
  const item = new Cardapio({
    nome: req.body.nome,
    descricao: req.body.descricao,
    preco: req.body.preco,
    categoria: req.body.categoria,
    imagem: req.body.imagem,
  });

  try {
    const novoItem = await item.save();
    res.status(201).json(novoItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Função para atualizar um item do cardápio
const atualizarItemCardapio = async (req, res) => {
  try {
    const itemAtualizado = await Cardapio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!itemAtualizado) {
      return res.status(404).json({ message: "Item não encontrado" });
    }
    res.json(itemAtualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Função para remover um item do cardápio
const removerItemCardapio = async (req, res) => {
  try {
    const itemRemovido = await Cardapio.findByIdAndDelete(req.params.id);
    if (!itemRemovido) {
      return res.status(404).json({ message: "Item não encontrado" });
    }
    res.json({ message: "Item removido" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export {
  listarCardapio,
  obterItemCardapio,
  adicionarItemCardapio,
  atualizarItemCardapio,
  removerItemCardapio,
};
