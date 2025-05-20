const express = require('express');
const route = express.Router();
const conexao = require('../config/conexao');

// Funcao auxiliar para executar queries
async function executeQuery(query, params) {

    const [resultado] = await conexao.execute(query, params);
    return resultado;
    
}

// Crud de usuario

// Criar
 router.post('/usuarios', async (req, res) => {
    const {nome, email, senha} = req.body;
    try {
        const resultado = await executeQuery(
            ' insert into usuarios (nome, email, senha) values (?, ?, ?) ',
            [nome, email,senha]
        );
        res.json({id: resultado.insertId, nome, email, senha});
    } catch (error){
        res.status(500).json({error: 'Erro ao criar usuarios'});
    }
 });

 // Listar
 router.get('/usuarios', async (req, res)=>{
    try{
        const usuarios = await executeQuery(' select * from usuarios ', []);
        res.json(usuarios);
    }catch (error){
        res.status(500).json({error: 'Erro ao listar usuarios'});
    }
 });

 // Atualizar 
router.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    try {
        await executeQuery(
            'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?',
            [nome, email, senha, id]
        );
        res.json({ id, nome, email, senha });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
});

// Deletar 
router.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await executeQuery('DELETE FROM usuarios WHERE id = ?', [id]);
        res.json({ message: 'Usuário deletado' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
});

// CRUD para Admins
// Listar todos os admins
router.get('/admin', async (req, res) => {
    try {
        const admins = await executeQuery('SELECT * FROM admin', []);
        res.json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar admins' });
    }
});

// Criar admin
router.post('/admin', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const result = await executeQuery(
            'INSERT INTO admin (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senha]
        );
        res.json({ id: result.insertId, nome, email });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar admin' });
    }
});

// Atualizar admin
router.put('/admin/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;
    try {
        await executeQuery(
            'UPDATE admin SET nome = ?, email = ?, senha = ? WHERE id = ?',
            [nome, email, senha, id]
        );
        res.json({ id, nome, email });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar admin' });
    }
});

// Deletar admin
router.delete('/admin/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await executeQuery('DELETE FROM admin WHERE id = ?', [id]);
        res.json({ message: 'Admin deletado' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar admin' });
    }
});

// CRUD para Pagamentos
// Listar todos os pagamentos
router.get('/pagamentos', async (req, res) => {
    try {
        const pagamentos = await executeQuery('SELECT * FROM pagamentos', []);
        res.json(pagamentos);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar pagamentos' });
    }
});

// Criar pagamento
router.post('/pagamentos', async (req, res) => {
    const { residencia_id, valor, data_pagamento, status } = req.body;
    try {
        const result = await executeQuery(
            'INSERT INTO pagamentos (residencia_id, valor, data_pagamento, status) VALUES (?, ?, ?, ?)',
            [residencia_id, valor, data_pagamento, status]
        );
        res.json({ id: result.insertId, residencia_id, valor, data_pagamento, status });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar pagamento' });
    }
});

// Atualizar pagamento
router.put('/pagamentos/:id', async (req, res) => {
    const { id } = req.params;
    const { residencia_id, valor, data_pagamento, status } = req.body;
    try {
        await executeQuery(
            'UPDATE pagamentos SET residencia_id = ?, valor = ?, data_pagamento = ?, status = ? WHERE id = ?',
            [residencia_id, valor, data_pagamento, status, id]
        );
        res.json({ id, residencia_id, valor, data_pagamento, status });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar pagamento' });
    }
});

// Deletar pagamento
router.delete('/pagamentos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await executeQuery('DELETE FROM pagamentos WHERE id = ?', [id]);
        res.json({ message: 'Pagamento deletado' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar pagamento' });
    }
});

// Crud de Residencias  

//Criar


// Listar


// Actualizar



module.exports = router;