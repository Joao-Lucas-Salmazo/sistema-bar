import Pedido from "../models/Pedido.js";
import Cardapio from "../models/Cardapio.js";

// Função para listar todos os pedidos
export const listarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate("itens.produto");
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Função para obter um pedido por ID
export const obterPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate(
      "itens.produto"
    );
    if (!pedido) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Função para criar um novo pedido
export const criarPedido = async (req, res) => {
  try {
    // 1. Buscar os detalhes completos dos produtos no cardápio
    const itensDoPedido = await Promise.all(
      req.body.itens.map(async (item) => {
        const produto = await Cardapio.findById(item.produto);
        if (!produto) {
          throw new Error(`Produto com ID ${item.produto} não encontrado`);
        }
        return {
          produto: item.produto,
          quantidade: item.quantidade,
          nome: produto.nome,
          preco: produto.preco,
        };
      })
    );

    // 2. Calcular o total do pedido
    const total = itensDoPedido.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );

    // 3. Criar o pedido
    const pedido = new Pedido({
      cliente: req.body.cliente,
      telefone: req.body.telefone,
      itens: itensDoPedido,
      total: total,
      status: req.body.status || "Novo",
    });

    // 4. Salvar o pedido
    const novoPedido = await pedido.save();
    res.status(201).json(novoPedido);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Função para atualizar um pedido (ex: status)
export const atualizarPedido = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id);
    if (!pedido) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }

    if (req.body.cliente) pedido.cliente = req.body.cliente;
    if (req.body.telefone) pedido.telefone = req.body.telefone;
    if (req.body.status) pedido.status = req.body.status;

    // Lógica para atualizar a QUANTIDADE de um item específico
    if (
      req.body.itens &&
      Array.isArray(req.body.itens) &&
      req.body.itens.length === 1 &&
      req.body.itens[0]._id &&
      req.body.itens[0].quantidade !== undefined
    ) {
      const itemParaAtualizar = pedido.itens.find(
        (item) => item._id.toString() === req.body.itens[0]._id
      );
      if (itemParaAtualizar) {
        itemParaAtualizar.quantidade = req.body.itens[0].quantidade;
        // Recalcular o total do pedido
        pedido.total = pedido.itens.reduce(
          (acc, item) => acc + item.preco * item.quantidade,
          0
        );
        const pedidoAtualizado = await pedido.save();
        await pedidoAtualizado.populate("itens.produto");
        return res.json(pedidoAtualizado);
      } else {
        return res
          .status(404)
          .json({ message: "Item não encontrado no pedido." });
      }
    }

    // Lógica para SUBSTITUIR os itens do pedido (para remoção e adição)
    if (req.body.itens && Array.isArray(req.body.itens)) {
      const novosItens = await Promise.all(
        req.body.itens.map(async (item) => {
          const produto = await Cardapio.findById(item.produto || item._id);
          if (!produto && !item._id) {
            throw new Error(
              `Produto com ID ${item.produto || item._id} não encontrado`
            );
          }
          return {
            produto:
              item.produto ||
              pedido.itens.find((i) => i._id.toString() === item._id)?.produto,
            quantidade: item.quantidade,
            nome:
              produto?.nome ||
              pedido.itens.find((i) => i._id.toString() === item._id)?.nome,
            preco:
              produto?.preco ||
              pedido.itens.find((i) => i._id.toString() === item._id)?.preco,
            _id: item._id, // Mantém o _id se já existir
          };
        })
      );
      pedido.itens = novosItens;

      // Recalcular o total do pedido
      pedido.total = novosItens.reduce(
        (acc, item) => acc + item.preco * item.quantidade,
        0
      );
    }

    const pedidoAtualizado = await pedido.save();
    await pedidoAtualizado.populate("itens.produto");
    res.json(pedidoAtualizado);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Função para remover um pedido
export const removerPedido = async (req, res) => {
  try {
    const pedidoRemovido = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedidoRemovido) {
      return res.status(404).json({ message: "Pedido não encontrado" });
    }
    res.json({ message: "Pedido removido" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
