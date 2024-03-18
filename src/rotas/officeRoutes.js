const express = require("express");
const verificarUsuarioLogado = require("../intermediarios/verificarUsuarioLogado");
const {
  listarProcessos,
} = require("../controladores/escritorio/listarProcessosEscritório");
const deletarProcesso = require("../controladores/escritorio/deletarProcessoEscritorio");
const editarProcesso = require("../controladores/escritorio/editarProcessoEscritorio");
const editarProcessoSchema = require("../schemas/editarProcessoSchema");
const autenticarEditarProcesso = require("../intermediarios/autenticarEditarProcesso");
const cadastrarProcesso = require("../controladores/escritorio/cadastrarProcessoEscritorio");
const cadastrarProcessoSchema = require("../schemas/cadastrarProcessoSchema");
const autenticarCadastroProcesso = require("../intermediarios/autenticarCadastroProcesso");
const cadastrarClienteEscritorio = require("../controladores/escritorio/cadastrarClienteEscritorio");
const autenticarCadastroClienteEscritorio = require("../intermediarios/autenticarCadastroClienteEscritorio");
const cadastrarClienteEscritorioSchema = require("../schemas/cadastroClienteEscritorioSchema");
const deletarCliente = require("../controladores/clientes/deletarClienteEscritorio");
const editarClienteEscritorio = require("../controladores/escritorio/editarClienteEscritorio");
const cadastrarFinanceiroProcesso = require("../controladores/escritorio/cadastrarFinanceiroProcesso");
const exibirFinanceiroProcessoEscritorio = require("../controladores/escritorio/exibirFinanceiroProcessoEscritorio");
const deletarFinanceiroProcessoEscritorio = require("../controladores/escritorio/deletarFinanceiroProcessoEscritorio");
const editarFinanceiroProcessoEscritorio = require("../controladores/escritorio/editarFinanceiroProcessoEscritorio");

const rotas = express();

rotas.use(verificarUsuarioLogado);

rotas.get("/processosEscritorio", listarProcessos);
rotas.post(
  "/cadastrarClienteEscritorio",
  autenticarCadastroClienteEscritorio(cadastrarClienteEscritorioSchema),
  cadastrarClienteEscritorio
);
rotas.delete("/deletarProcesso/:id", deletarProcesso);
rotas.delete("/deletarClienteEscritorio/:id", deletarCliente);
rotas.put("/editarClienteEscritorio/:id", editarClienteEscritorio);
rotas.put(
  "/editarProcessoEscritorio/:id",
  autenticarEditarProcesso(editarProcessoSchema),
  editarProcesso
);
rotas.post(
  "/cadastrarProcesso",
  autenticarCadastroProcesso(cadastrarProcessoSchema),
  cadastrarProcesso
);
rotas.post("/cadastrarFinanceiroProcesso", cadastrarFinanceiroProcesso);
rotas.get(
  "/exibirFinanceiroProcessoEscritorio/:id",
  exibirFinanceiroProcessoEscritorio
);
rotas.put(
  "/editarFinanceiroProcessoEscritorio/:id",
  editarFinanceiroProcessoEscritorio
);
rotas.delete(
  "/deletarFinanceiroProcessoEscritorio/:id",
  deletarFinanceiroProcessoEscritorio
);

module.exports = rotas;
