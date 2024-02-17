const pool = require("../../conexao");

const obterCliente = async (req, res) => {
  const { id, tipo_cadastro } = req.params;

  try {
    let resultado;

    if (tipo_cadastro === "cliente") {
      resultado = await pool.query(
        "select * from cliente_dados where id = $1",
        [id]
      );
    } else {
      resultado = await pool.query("select * from usuarios where id = $1", [
        id,
      ]);
    }
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: "Cliente não encontrado" });
    }

    return res.status(200).json(resultado.rows);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = obterCliente;
