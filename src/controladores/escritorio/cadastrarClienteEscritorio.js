const pool = require("../../conexao");
const bcrypt = require("bcrypt")

const cadastrarClienteEscritorio = async (req, res) => {
  const {
    nome,
    nascimento,
    genero,
    nacionalidade,
    celular,
    email,
    redes_sociais,
    rg,
    cpf,
    profissao,
    estado_civil,
    formacao_academica,
    cep,
    cidade,
    bairro,
    uf,
    logradouro,
    complemento,
    status,
    senha,
    tipo_cadastro,
    infos,
  } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await pool.query(
      "insert into cliente_dados (nome, nascimento, genero, nacionalidade, celular, email, redes_sociais, rg, cpf, profissao, estado_civil, formacao_academica, cep, cidade, bairro, uf, logradouro, complemento, status, senha, tipo_cadastro, infos) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)",
      [
        nome,
        nascimento,
        genero,
        nacionalidade,
        celular,
        email,
        redes_sociais,
        rg,
        cpf,
        profissao,
        estado_civil,
        formacao_academica,
        cep,
        cidade,
        bairro,
        uf,
        logradouro,
        complemento,
        status,
        senhaCriptografada,
        tipo_cadastro,
        infos,
      ]
    );

    return res.status(201).json({ mensagem: "Processo cadastrado" });
  } catch (error) {
    console.log(error);
    if (error.code === "23505") {
      const regex = /\(([^)]+)\)/;
      const matches = error.detail.match(regex);
      return res
        .status(409)
        .json({ mensagem: `Erro no ${matches} já está cadastrado` });
    }
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = cadastrarClienteEscritorio;
