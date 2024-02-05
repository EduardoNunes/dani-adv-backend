require("dotenv").config({ path: "./src/.env" });

const express = require("express");
const clientRoutes = require("./rotas/clientRoutes");
const officeRoutes = require("./rotas/officeRoutes");
const usuarioRoutes = require("./rotas/usuarioRoutes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use(usuarioRoutes);
app.use(clientRoutes);
app.use(officeRoutes);

const port = process.env.PORT || 5432;

app.listen(port, () => console.log(`Groovando na porta ${port}`));
