const pool = require("../../conexao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const senhaJwt = require("../../senhaJwt");

const login = async (req, res) => {
  const { email, senha, tipoCadastro } = req.body;

  try {
    let usuario;
    console.log(tipoCadastro)
    if (tipoCadastro === "cliente") {
      usuario = await pool.query(
        "select * from cliente_dados where email = $1",
        [email]
      );
    } else {
      usuario = await pool.query("select * from usuarios where email = $1", [
        email,
      ]);
      console.log(usuario.rows);
    }

    if (usuario.rowCount < 1) {
      return res
        .status(404)
        .json({ mensagem: "Email e/ou senha inválido(s).." });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);

    if (!senhaValida) {
      return res
        .status(400)
        .json({ mensagem: "Email e/ou senha inválido(s)..." });
    }

    if (usuario.rows[0].tipo_cadastro !== tipoCadastro) {
      return res.status(400).json({
        mensagem: `Usuário não encontrado na categoria ${tipoCadastro}`,
      });
    }

    const token = jwt.sign(
      { id: usuario.rows[0].id, cadastro: usuario.rows[0].cadastro },
      senhaJwt,
      {
        expiresIn: "8h",
      }
    );

    const { id, nome, tipo_cadastro } = usuario.rows[0];
    const usuarioLogado = { id, nome, tipo_cadastro };

    return res.json({ usuario: usuarioLogado, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ mensagem: "Não autorizado" });
  }
};

module.exports = {
  login,
};
