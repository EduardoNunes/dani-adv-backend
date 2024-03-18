const pool = require("../../conexao");

const editarProcesso = async (req, res) => {
  const { id } = req.params;
  const {
    contratante,
    autor,
    reu,
    numero,
    tipo_acao,
    vara,
    juiz,
    comarca,
    data_entrada,
    atualizado,
    status,
    infos,
  } = req.body;

  try {
    const processo = await pool.query("select * from processos where id = $1", [
      id,
    ]);

    if (processo.rows.length === 0) {
      return res.status(404).json({ mensagem: "processo não encontrado" });
    }

    await pool.query(
      "update processos set contratante = $1, autor = $2, reu = $3, numero = $4, tipo_acao = $5, vara = $6, juiz = $7, comarca = $8, data_entrada =  $9, atualizado = $10, status = $11, infos = $12 where id = $13",
      [
        contratante,
        autor,
        reu,
        numero,
        tipo_acao,
        vara,
        juiz,
        comarca,
        data_entrada,
        atualizado,
        status,
        infos,
        id,
      ]
    );

    const resultado = await pool.query(
      "select * from processos where id = $1",
      [id]
    );

    return res.status(201).json(resultado.rows);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = editarProcesso;
