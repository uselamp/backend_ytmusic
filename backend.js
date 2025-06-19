// backend.js
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Criação do app Express
const app = express();
app.use(cors());

// Criação do servidor HTTP
const httpServer = createServer(app);

// Criação do servidor WebSocket com Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: "*", // liberação geral — altere para a URL do frontend na produção
    methods: ["GET", "POST"]
  }
});

// Conexão de clientes
io.on("connection", (socket) => {
  console.log("🟢 Cliente conectado");

  socket.on("play", (data) => {
    console.log("▶️ Emitindo play:", data);
    socket.broadcast.emit("play", data); // envia para todos menos o transmissor
  });

  socket.on("pause", () => {
    console.log("⏸️ Emitindo pause");
    socket.broadcast.emit("pause");
  });

  socket.on("disconnect", () => {
    console.log("🔴 Cliente desconectado");
  });
});

// Inicializa servidor
const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});