const pool = require("../../conexao");

const editarClienteEscritorio = async (req, res) => {
  const { id } = req.params;
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
    infos,
  } = req.body;

  try {
    const cliente = await pool.query(
      "select * from cliente_dados where id = $1",
      [id]
    );

    if (cliente.rows.length === 0) {
      return res.status(404).json({ mensagem: "cliente não encontrado" });
    }

    await pool.query(
      "update cliente_dados set nome = $1, nascimento = $2, genero = $3, nacionalidade = $4, celular = $5, email = $6, redes_sociais = $7, rg = $8, cpf = $9, profissao = $10, estado_civil = $11, formacao_academica = $12, cep = $13, cidade = $14, bairro = $15, uf = $16, logradouro = $17, complemento = $18, status = $19, infos = $20 where id = $21",
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
        infos,
        id,
      ]
    );

    const resultado = await pool.query(
      "select * from cliente_dados where id = $1",
      [id]
    );

    return res.status(201).json(resultado.rows);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = editarClienteEscritorio;
