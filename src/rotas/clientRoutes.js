const express = require("express");
const verificarUsuarioLogado = require("../intermediarios/verificarUsuarioLogado");
const {
  listarProcessos,
} = require("../controladores/clientes/listarProcessoCliente");

const obterCliente = require("../controladores/clientes/obterCliente");
const listarClientes = require("../controladores/clientes/listarClientes");
const {
  listarQuantidadeProcessosClientes,
} = require("../controladores/clientes/listarQuantidadeProcessosClientes");

const rotas = express();

rotas.get("/obterCliente/:id/:tipo_cadastro", obterCliente);

rotas.use(verificarUsuarioLogado);

rotas.get("/processosClientes", listarProcessos);
rotas.get("/listarClientes", listarClientes);
rotas.get(
  "/listarQuantidadeProcessosClientes",
  listarQuantidadeProcessosClientes
);

module.exports = rotas;
