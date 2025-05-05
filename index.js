const express = require('express');
const app = express();
const port = 3000;

//Middleware para permitir arquivos json
//app.use(express.json());

//Middleware para permitir arquivos html
app.use(express.static('public'));

//Rotas get
app.get('/', (req, res) => 
    {
    res.send('Sucesso! API em Node.js');
    }
);

app.get('/usuarios', (req, res) => 
    {
        res.json(
            [
                {
                    id:1,
                    nome: 'Dorivaldo',
                    email: 'dorivaldo@gmail.com'
                },
                {
                    id:2,
                    nome: 'Gonçalo',
                    email: 'goncalo@gmail.com'
                },
                {
                    id:3,
                    nome: 'Ferreira',
                    email: 'ferreira@gmail.com'
                }
            ]
        );
    }
);

//Rotas post

app.post('/usuarios', (req, res)=>
    {
        const novoUser = req.body; // pegando os dados do usuario com a requisição
        res.status(201).json(novoUser); // salvando o novo usuario
    }
);

//Iniciar o servidor
app.listen(port, ()=>
    {
        console.log(`API rodando em http://localhost:${port}`);
    }
);