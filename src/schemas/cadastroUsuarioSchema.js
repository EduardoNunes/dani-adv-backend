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
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*\(\)_\-=+'\[{\]};:'<,>.?\/\\])[0-9a-zA-Z!@#\$%\^&\*\(\)_\-=+'\[{\]};:'<,>.?\/\\]{8,}$/
    )
    .messages({
        "any.required": "Por favor, insira sua senha.",
        "string.empty": "Por favor, insira sua senha.",
        "string.min": "A senha deve ter no mínimo 8 caracteres.",
        "string.trim": "A senha não pode conter espaços em branco.",
        "string.base": "A senha deve conter pelo menos 1 letra maiúscula, 1 letra minúscula, 1 número e 1 caractere especial.",
        "string.pattern.base": "A senha deve conter pelo menos 1 letra minúscula, 1 letra maiúscula, 1 número e 1 caractere especial."
    })
    .custom((value, helpers) => {
        if (!/(?=.*[a-z])/.test(value)) {
            return helpers.message({ custom: "A senha deve conter pelo menos 1 letra minúscula." });
        }
        if (!/(?=.*[A-Z])/.test(value)) {
            return helpers.message({ custom: "A senha deve conter pelo menos 1 letra maiúscula." });
        }
        if (!/(?=.*\d)/.test(value)) {
            return helpers.message({ custom: "A senha deve conter pelo menos 1 número." });
        }
        if (!/(?=.*[!@#\$%\^&\*\(\)_\-=+'\[{\]};:'<,>.?\/\\])/.test(value)) {
            return helpers.message({ custom: "A senha deve conter pelo menos 1 caractere especial." });
        }
        return value;
    }),
  tipoCadastro: joi.required().messages({
    "any.required": "O campo tipo de cadastro deve ser selecionado",
  }),
});

module.exports = cadastroUsuarioSchema;
