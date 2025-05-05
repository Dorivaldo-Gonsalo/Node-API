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
        email: 'dorivaldo@gmail.com',
        senha: bcrypt.hashSync('dorivaldo1234', 8)
    },
    {
        id:2,
        nome: 'Gonçalo',
        email: 'goncalo@gmail.com',
        senha: bcrypt.hashSync('goncalo1234', 8)
    },
    {
        id:3,
        nome: 'Ferreira',
        email: 'ferreira@gmail.com',
        senha: bcrypt.hashSync('ferreira1234', 8)
    },
    {
        id:4,
        nome: 'admin',
        email: 'geral.gmail.com',
        senha: bcrypt.hashSync('admin1234', 8)
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

//Rota de login gerando o token
const jwt = require('jsonwebtoken');
app.post('/login', (req, res)=>
    {
        const { email, senha } = req.body;
        const user = usuarios.find(u => u.nome === u.nome);
            if(!user)
                {
                    return res.status(401).json(
                        {
                            message: 'Credenciais inválidas'
                        }
                    );
                }
        //Verificar senha
        const senhaV = bcrypt.compareSync(senha, user.senha);
                if(!senhaV)
                    {
                        return res.status(401).json(
                            {
                                message: 'Senha inválida'
                            }
                        );
                    }
        //Gerar token
        const token = jwt.sign(
            {
                id:user.id,
                nome: user.nome
            }, 
            'segredo-super-secreto',
            {
                expiresIn: '1h'
            }
           
        );
        res.json(
            {
                tokwen
            }
            );
    }
);

//Middleware para minhas rotas protegidas
function authToken(req, res, next)
    {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if(!token) return res.status(401).json({message: 'Token não fornecido!'});

        jwt.verify(token, 'segredo-super-secreto', (err, user)=>
            {
                if(err) return res.status(403).json({message: 'Token inválido!'});
                req.user = user;
                next();
            }
        );
    }

//Rotas protegidas de admin
app.get('/dashboard', authToken, (req, res)=>
    {
        res.json({
            message:'Bem-Vindo!', user: req.user
        });
    });

//Iniciar o servidor
app.listen(port, ()=>
    {
        console.log(`API rodando em http://localhost:${port}`);
    }
);