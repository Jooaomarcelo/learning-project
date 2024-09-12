const app = require('./app');

// Usando o módulo dotenv para a manipulação das variáveis de ambiente
require('dotenv').config();

const port = process.env.PORT || 3333;

app.listen(port, () => console.log(`Servidor rodando na porta:${port}`));