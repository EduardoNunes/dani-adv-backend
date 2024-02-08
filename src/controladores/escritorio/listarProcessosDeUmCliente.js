const pool = require("../../conexao");

const listarProcessosDeUmCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await pool.query(
      "select * from processos where usuario_id = $1",
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: "Este cliente não tem processos cadastrados" });
    }

    return res.json(resultado.rows);
  } catch (error) {
    console.log(error.mensage);
  }
};

module.exports = { listarProcessosDeUmCliente };
