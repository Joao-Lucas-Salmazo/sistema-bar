import dotenv from "dotenv"; // Importa dotenv usando ES Modules
dotenv.config();

const config = {
  port: process.env.PORT || 3001,
  databaseUrl:
    process.env.DATABASE_URL || "mongodb://localhost:27017/barcentral",
  // Outras configurações podem ser adicionadas aqui
};

export default config; // Exporta o objeto de configuração
