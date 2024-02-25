const pool = require("../../conexao");

const deletarFinanceiroProcessoEscritorio = async (req, res) => {
  const { processoId } = req.params;

  try {
    const financeiro = await pool.query(
      "select * from financeiro where processos_id = $1",
      [processoId]
    );

    if (financeiro.rows.length === 0) {
      return res
        .status(404)
        .json({ mensagem: "Os dados financeiros não existem" });
    }

    await pool.query("delete from financeiro where id = $1", [processoId]);

    return res.status(201).json({ mensagem: "Processo excluído com sucesso!" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = deletarFinanceiroProcessoEscritorio;
