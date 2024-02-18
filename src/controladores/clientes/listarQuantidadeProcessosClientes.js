const pool = require("../../conexao");

const listarQuantidadeProcessosClientes = async (req, res) => {
  const usuarioId = req.usuario.id;

  try {
    const resultado = await pool.query(`
      SELECT
          cliente_dados.id AS cliente_id,
          cliente_dados.nome AS cliente_nome,
          COUNT(processos.id) AS quantidade_de_processos
      FROM
          cliente_dados
      LEFT JOIN
          processos ON cliente_dados.id = processos.cliente_id
      GROUP BY
          cliente_dados.id, cliente_dados.nome
    `);
    
    res.json(resultado.rows);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listarQuantidadeProcessosClientes,
};
