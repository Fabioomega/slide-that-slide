const mongoose = require("mongoose");

// Docker injeta esta variável de ambiente
const dbURL = process.env.MONGO_URL;

mongoose
  .connect(dbURL)
  .then(() => console.log("Conexão com o MongoDB estabelecida com sucesso!"))
  .catch((err) => console.error("Falha ao conectar ao MongoDB:", err));
