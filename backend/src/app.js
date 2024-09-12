const express = require('express');
const router = require('./router');

const app = express();

// Antes de usar o router -> Função do express para conseguirmos trabalhar com json 
app.use(express.json());

app.use(router);

module.exports = app;