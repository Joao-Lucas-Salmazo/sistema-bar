import app from "./app.js";

const port = app.get("port"); // Obtém a porta do app.js

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
