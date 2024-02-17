const pool = require("../../conexao");

const cadastrarProcesso = async (req, res) => {
  const {
    autor,
    reu,
    numero,
    vara,
    juiz,
    comarca,
    data_entrada,
    atualizado,
    status,
    infos,
    cliente_id,
  } = req.body;

  try {
    if (!cliente_id) {
      return res
        .status(400)
        .json({ mensagem: "O campo cliente_id é obrigatório" });
    }

    const usuarioExistente = await pool.query(
      "SELECT id FROM cliente_dados WHERE id = $1",
      [cliente_id]
    );

    if (usuarioExistente.rows.length === 0) {
      return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    await pool.query(
      "insert into processos (autor, reu, numero, vara, juiz, comarca, data_entrada, atualizado, status, infos, cliente_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [
        autor,
        reu,
        numero,
        vara,
        juiz,
        comarca,
        data_entrada,
        atualizado,
        status,
        infos,
        cliente_id,
      ]
    );

    return res.status(201).json({ mensagem: "Processo cadastrado" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = cadastrarProcesso;
