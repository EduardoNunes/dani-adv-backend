const joi = require("joi");

const cadastroUsuarioSchema = joi.object({
  nome: joi.string().min(5).required().messages({
    "string.empty": "O campo nome é obrigatório",
    "any.required": "O campo nome é obrigatório",
    "string.base": "Insira um nome válido",
  }),
  email: joi.string().email().required().messages({
    "any.required": "O campo email é obrigatório",
    "string.empty": "O campo email é obrigatório",
    "string.email": "Digite um e-mail válido",
    "string.base": "Insira um e-mail válido",
    "string.trim": "O campo e-mail não pode conter espaços em branco",
  }),
  senha: Joi.string()
    .required()
    .min(8)
    .pattern(
        new RegExp(/^(?=.*[a-z])/),
        { name: 'lowercaseLetters', invert: false }
    )
    .pattern(
        new RegExp(/^(?=.*[A-Z])/),
        { name: 'uppercaseLetters', invert: false }
    )
    .pattern(
        new RegExp(/^(?=.*\d)/),
        { name: 'numbers', invert: false }
    )
    .pattern(
        new RegExp(/^(?=.*[@$!%?&])/),
        { name: 'specialCharacters', invert: false }
    )
    .messages({
        "any.required": "O campo senha é obrigatório",
        "string.empty": "O campo senha é obrigatório",
        "string.min": "A senha deve ter no mínimo 8 caracteres",
        "string.trim": "O campo senha não pode conter espaços em branco",
        "string.base": "Insira uma senha válida",
        "lowercaseLetters.base": "A senha deve conter pelo menos 1 letra minúscula",
        "uppercaseLetters.base": "A senha deve conter pelo menos 1 letra maiúscula",
        "numbers.base": "A senha deve conter pelo menos 1 número",
        "specialCharacters.base": "A senha deve conter pelo menos 1 caractere especial"
    }),
  tipoCadastro: joi.required().messages({
    "any.required": "O campo tipo de cadastro deve ser selecionado",
  }),
});

module.exports = cadastroUsuarioSchema;
