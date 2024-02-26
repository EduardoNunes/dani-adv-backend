const pool = require("../../conexao");

const cadastrarFinanceiroProcesso = async (req, res) => {
  const {
    entrada,
    data_entrada_processo,
    quantidade_parcelas,
    valor_parcelas,
    datas_parcelas,
    parcelas_pagas,
    porcentagem_final,
    data_porcentagem_final,
    total,
    processo_id,
  } = req.body;

  try {
    if (!processo_id) {
      return res
        .status(400)
        .json({ mensagem: "O campo processo_id é obrigatório" });
    }

    const processoExistente = await pool.query(
      "SELECT id FROM processos WHERE id = $1",
      [processo_id]
    );

    if (processoExistente.rows.length === 0) {
      return res.status(404).json({ mensagem: "Processo não encontrado" });
    }

    const resultado = await pool.query(
      "insert into financeiro (entrada, data_entrada, quantidade_parcelas, valor_parcelas, datas_parcelas, parcelas_pagas, porcentagem_final, data_porcentagem_final, total, processos_id) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
      [
        entrada,
        data_entrada_processo,
        quantidade_parcelas,
        valor_parcelas,
        datas_parcelas,
        parcelas_pagas,
        porcentagem_final,
        data_porcentagem_final,
        total,
        processo_id,
      ]
    );

    const financeiroCadastrado = resultado.rows[0];

    return res.status(201).json({
      mensagem: "Financeiro cadastrado",
      financeiro: financeiroCadastrado,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = cadastrarFinanceiroProcesso;
