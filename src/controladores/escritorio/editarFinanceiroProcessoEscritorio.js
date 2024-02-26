const pool = require("../../conexao");

const editarFinanceiroProcessoEscritorio = async (req, res) => {
  const { id } = req.params;

  try {
    const financeiro = await pool.query(
      "select * from financeiro where processos_id = $1",
      [id]
    );

    if (financeiro.rows.length === 0) {
      return res
        .status(404)
        .json({ mensagem: "Este processo não tem um financeiro cadastrado." });
    }

    
    return res.status(201).json(financeiro.rows);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = editarFinanceiroProcessoEscritorio;
