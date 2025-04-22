import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import config from "./config/config.js";
import router from "./routes.js";

const app = express();

// Configurar a porta do servidor
app.set("port", config.port);

// Conectar ao banco de dados MongoDB
mongoose
  .connect(config.databaseUrl) // Removidas as opções deprecated
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Middlewares globais
app.use(cors());
app.use(bodyParser.json());

// Usar as rotas
app.use("/api", router);

// Rota de exemplo
app.get("/", (req, res) => {
  res.send("Servidor Bar Central está rodando!");
});

export default app;
