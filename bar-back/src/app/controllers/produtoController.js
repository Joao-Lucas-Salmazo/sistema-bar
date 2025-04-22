import Produto from "../models/produtoModel.js";

// Listar todos os produtos
export const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.find();
    res.json(produtos);
  } catch (error) {
    console.error("Erro ao listar produtos:", error);
    res.status(500).json({ message: "Erro ao listar produtos" });
  }
};

// Obter um produto por ID (opcional, mas útil para futuras funcionalidades)
export const obterProduto = async (req, res) => {
  try {
    const produto = await Produto.findById(req.params.id);
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(produto);
  } catch (error) {
    console.error("Erro ao obter produto:", error);
    res.status(500).json({ message: "Erro ao obter produto" });
  }
};

// Adicionar um novo produto
export const adicionarProduto = async (req, res) => {
  const { nome, preco, descricao } = req.body;
  const novoProduto = new Produto({ nome, preco, descricao });

  try {
    const produtoSalvo = await novoProduto.save();
    res.status(201).json(produtoSalvo);
  } catch (error) {
    console.error("Erro ao adicionar produto:", error);
    res.status(500).json({ message: "Erro ao adicionar produto" });
  }
};

// Atualizar um produto
export const atualizarProduto = async (req, res) => {
  try {
    const produtoAtualizado = await Produto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Retorna o documento atualizado
    );
    if (!produtoAtualizado) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json(produtoAtualizado);
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ message: "Erro ao atualizar produto" });
  }
};

// Remover um produto
export const removerProduto = async (req, res) => {
  try {
    const produtoRemovido = await Produto.findByIdAndDelete(req.params.id);
    if (!produtoRemovido) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.json({ message: "Produto removido com sucesso" });
  } catch (error) {
    console.error("Erro ao remover produto:", error);
    res.status(500).json({ message: "Erro ao remover produto" });
  }
};
