const joi = require("joi");

const cadastroClienteEscritorioSchema = joi.object({
  nome: joi.string(),
  nascimento: joi.string().allow(null, ''),
  genero: joi.string().allow(null, ''),
  nacionalidade: joi.string().allow(null, ''),
  celular: joi.string(),
  email: joi.string(),
  redes_sociais: joi.string().allow(null, ''),
  rg: joi.string(),
  cpf: joi.string(),
  profissao: joi.string().allow(null, ''),
  estado_civil: joi.string().allow(null, ''),
  formacao_academica: joi.string().allow(null, ''),
  cep: joi.string(),
  cidade: joi.string(),
  bairro: joi.string(),
  uf: joi.string(),
  logradouro: joi.string(),
  complemento: joi.string().allow(null, ''),
  infos: joi.string().allow(null, ''),
});

module.exports = cadastroClienteEscritorioSchema;
