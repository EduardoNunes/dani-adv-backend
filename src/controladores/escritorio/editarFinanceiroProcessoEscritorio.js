const pool = require("../../conexao");

const editarFinanceiroProcessoEscritorio = async (req, res) => {
  const { id } = req.params;
  const {
    entrada,
    data_entrada,
    quantidade_parcelas,
    valor_parcelas,
    datas_parcelas,
    porcentagem_final,
    data_porcentagem_final,
    condenacao,
    resultadoPorcentagem,
    total,
  } = req.body;

  try {
    const financeiro = await pool.query(
      "update financeiro set entrada = $1, data_entrada = $2, quantidade_parcelas = $3, valor_parcelas = $4, datas_parcelas = $5, porcentagem_final = $6, data_porcentagem_final = $7, condenacao = $8, resultado_porcentagem =  $9, total = $10 where processos_id = $11",
      [
        entrada,
        data_entrada,
        quantidade_parcelas,
        valor_parcelas,
        datas_parcelas,
        porcentagem_final,
        data_porcentagem_final,
        condenacao,
        resultadoPorcentagem,
        total,
        id,
      ]
    );

    await pool.query(
      `
    UPDATE processos 
    SET status = 
      CASE 
        WHEN EXISTS (
            SELECT 1 FROM financeiro 
            WHERE datas_parcelas LIKE '%:Vencida%' 
                AND financeiro.processos_id = $1
        ) THEN 'atrasado'
        WHEN NOT EXISTS (
            SELECT 1 FROM financeiro 
            WHERE datas_parcelas LIKE '%:Vencida%' 
                AND financeiro.processos_id = $1
        ) AND NOT EXISTS (
            SELECT 1 FROM financeiro 
            WHERE datas_parcelas LIKE '%:Pendente%' 
                AND financeiro.processos_id = $1
        ) THEN 'Quitado'
        ELSE 'em dia'
      END
    WHERE id = $1;
  `,
      [id]
    );

    return res.status(201).json("Financeiro atualizado com sucesso");
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = editarFinanceiroProcessoEscritorio;
