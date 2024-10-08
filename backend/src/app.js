const express = require('express');
const cors = require('cors');
const router = require('./router');

const app = express();

// Antes de usar o router -> Função do express para conseguirmos trabalhar com json
app.use(express.json());

// Habilitando o cors para liberar o acesso a aplicação
app.use(cors());
app.use(router);

module.exports = app;
