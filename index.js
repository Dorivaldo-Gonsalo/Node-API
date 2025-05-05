const express = require('express');
const app = express();
const port = 3000;

//Middleware para permitir arquivos json
//app.use(express.json());

//Middleware para permitir arquivos html
app.use(express.static('public'));

//Estrutura de armazenamento
let usuarios = [
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
];

//Rotas get
app.get('/', (req, res) => 
    {
    res.send('Sucesso! API em Node.js');
    }
);

app.get('/usuarios', (req, res) => 
    {
       // res.json([{id:1, nome: 'Dorivaldo', email: 'dorivaldo@gmail.com' }, {id:2, nome: 'Gonçalo',  email: 'goncalo@gmail.com' }, { id:3, nome: 'Ferreira', email: 'ferreira@gmail.com' }]); //Retornando Json sem encapsulamento
       res.json(usuarios); //pegando usuario com encapsulamento
    }
);

//Rotas post

app.post('/usuarios', (req, res)=>
    {
        const novoUser = req.body; // pegando os dados do usuario com a requisição
        novoUser.id = usuarios.length ? usuarios[usuarios.length - 1].id + 1 : 1;
        usuarios.push(novoUser);
        res.status(201).json(novoUser); // salvando o novo usuario 
    }
);

// Rota show
app.get('/usuarios/:id', (req, res)=>
    {
        const id = parseInt(req.params.id);
        const usuario = usuarios.find(u => u.id === id);
            if (usuario)
                {
                    res.json(usuario);
                }
            else
                {
                    res.status(404).json(
                        {
                            message: 'Usuário não encontrado!'
                        }
                    );
                }
    }
);

//Rota put
app.put('usuarios/:id', (req, res)=>
    {
        const id = parseInt(req.params.id);
        const index = usuarios.findIndex(u => u.id === id);
            if(index !== 1)
                {
                    usuarios[index] = 
                        {
                            id,
                            nome,
                            email,
                            ...req.body
                        };
                }
            else 
                {
                    res.status(404).json(
                        {
                            message: 'Erro ao buscar os dados. Por favor tente mais tarde'
                        }
                    );
                }
    }
);

//Rota delete
app.delete('/usuarios/:id', (req, res)=>
    {
        const id = parseInt(req.params.id);
        const index = usuarios.findIndex(u => u.id === id);
            if(index !== -1 )
                {
                    usuarios.splice(index, 1);
                    res.status(204).end();
                }
            else
                {
                    res.status(404).json(
                        {
                            message: 'Erro ao deletar o usuário'
                        }
                    );
                }
    }
);

//Iniciar o servidor
app.listen(port, ()=>
    {
        console.log(`API rodando em http://localhost:${port}`);
    }
);