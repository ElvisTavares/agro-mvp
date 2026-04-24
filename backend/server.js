// server.js
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors()); // Permite que o Vue faça requisições para cá

const DATA_FILE = "./data.json";

// ROTA 1: O Vue.js chama essa rota para ler os dados
app.get("/api/atividades", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  res.json(data);
});

// ROTA 2: O seu Bot (após passar pelo Mistral) envia o JSON para cá
app.post("/api/webhook", (req, res) => {
  const novaAtividade = req.body;

  // Adiciona um ID único e um timestamp
  novaAtividade.id = Date.now();

  // Lê o arquivo atual
  const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));

  // Coloca a nova atividade no TOPO da lista (unshift)
  data.unshift(novaAtividade);

  // Salva o arquivo novamente
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  console.log("Nova atividade salva com sucesso!", novaAtividade);
  res.status(200).send({ message: "Salvo!" });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
