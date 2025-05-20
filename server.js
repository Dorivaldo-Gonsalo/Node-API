// importando as bibliotecas express, bodyParser, cors, apiRoutees

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const port = 14477;

// Config de middleware

app.use(cors()); // Habilitando as requisições do front
app.use(bodyParser.json()); // Processar corpos de requisições JSON
app.use(express.static('public')); // Serve arquivos estáticos (HTML, CSS, JS)

// Rota da API
app.use('/api', apiRoutes);

app.listen(port, ()=>{
    console.log(`Servidor actido em http:\\localhost:${port}`);
});