const pool = require("../../conexao");

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
    infos,
  } = req.body;

  try {
    await pool.query(
      "insert into cliente_dados (nome, nascimento, genero, nacionalidade, celular, email, redes_sociais, rg, cpf, profissao, estado_civil, formacao_academica, cep, cidade, bairro, uf, logradouro, complemento, infos) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)",
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
