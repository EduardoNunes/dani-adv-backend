const joi = require("joi");

const cadastroClienteEscritorioSchema = joi.object({
  nome: joi.string().min(5).required().messages({
    "string.empty": "O campo nome é obrigatório",
    "any.required": "O campo nome é obrigatório",
    "string.base": "Insira um nome válido",
  }),
  nascimento: joi.string().allow(null, ""),
  genero: joi.string().allow(null, ""),
  nacionalidade: joi.string().allow(null, ""),
  celular: joi.string().required().messages({
    "any.required": "O campo celular é obrigatório",
    "string.empty": "O campo celular é obrigatório",
  }),
  email: joi.string().email().required().messages({
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
    "string.email": "Digite um e-mail válido",
    "string.base": "Insira um e-mail válido",
    "string.trim": "O campo e-mail não pode conter espaços em branco",
  }),
  redes_sociais: joi.string().allow(null, ""),
  rg: joi.string().required().messages({
    "any.required": "O campo RG é obrigatório",
    "string.empty": "O campo RG é obrigatório",
  }),
  cpf: joi.string().required().messages({
    "any.required": "O campo CPF é obrigatório",
    "string.empty": "O campo CPF é obrigatório",
  }),
  profissao: joi.string().allow(null, ""),
  estado_civil: joi.string().allow(null, ""),
  formacao_academica: joi.string().allow(null, ""),
  cep: joi.string().required().messages({
    "any.required": "O campo CEP é obrigatório",
    "string.empty": "O campo CEP é obrigatório",
  }),
  cidade: joi.string().required().messages({
    "any.required": "O campo cidade é obrigatório",
    "string.empty": "O campo cidade é obrigatório",
  }),
  bairro: joi.string().required().messages({
    "any.required": "O campo bairro é obrigatório",
    "string.empty": "O campo bairro é obrigatório",
  }),
  uf: joi.string().required().messages({
    "any.required": "O campo UF é obrigatório",
    "string.empty": "O campo UF é obrigatório",
  }),
  logradouro: joi.string().required().messages({
    "any.required": "O campo logradouro é obrigatório",
    "string.empty": "O campo logradouro é obrigatório",
  }),
  complemento: joi.string().allow(null, ""),
  status: joi.string(),
  senha: joi
    .string()
    .required()
    .min(8)
    .pattern(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*\(\)_\-=+'\[{\]};:'<,>.?\/\\])[0-9a-zA-Z!@#\$%\^&\*\(\)_\-=+'\[{\]};:'<,>.?\/\\]{8,}$/
    )
    .messages({
      "any.required": "O campo senha é obrigatório",
      "string.empty": "O campo senha é obrigatório",
      "string.min": "A senha deve ter no mínimo 8 caracteres",
      "string.trim": "O campo senha não pode conter espaços em branco",
      "string.base": "Insira uma senha válida",
      "string.pattern.base":
        "A senha deve conter pelo menos 1 letra maiúscula, 1 número e 1 caractere especial",
    }),
  tipo_cadastro: joi.required().messages({
    "any.required": "O campo tipo de cadastro deve ser selecionado",
  }),
  infos: joi.string().allow(null, ""),
});

module.exports = cadastroClienteEscritorioSchema;
