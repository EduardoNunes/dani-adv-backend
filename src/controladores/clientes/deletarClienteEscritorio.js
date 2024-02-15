const pool = require("../../conexao");

const deletarCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente_dados = await pool.query("select * from cliente_dados where id = $1", [
      id,
    ]);

    if (cliente_dados.rows.lenght === 0) {
      return res.status(404).json({ mensagem: "Este usuário não existe" });
    }

    await pool.query("delete from cliente_dados where id = $1", [id]);

    return res.status(200).json({ mensagem: "Usuário deletado" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = deletarCliente;
