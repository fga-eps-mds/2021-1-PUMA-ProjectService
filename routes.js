const { response } = require('express');
const express = require('express');
const dbConfig = require('./dbconfig/dbConfig');
const router = express.Router();
const db = require('./dbconfig/dbConfig');
const project = require('./services/ProjectService');

router.get('/', (req, res) =>{
    res.json({
        Project: "Puma"
    });
});

router.post('/projeto/cadastro', async function(req, res) {//Falta tratamento dos dados

    try {
        res.json(await project.create(req.body));
    } catch (err) {
        console.error('Erro durante a criação do projeto', err.message);
    }

    // var body = req.body;
    // res.status = 200

    // var result = db.query('INSERT INTO PROJETO(descricao,concluido,aprovado,agente_externo,disciplina_aloc) VALUES ($1,$2,$3,$4,$5) RETURNING *', [body.descricao,body.concluido,body.aprovado,body.agente_externo,body.disciplina_aloc]).then((response) => {
    //     res.status(200).json({ response: response.rows });
    //     })
    //     .catch((response) => {
    //         res.status(400).json({ response: response });
    //     });
});


router.get('/projeto/visualizar/:idProjeto', (req, res) =>{
    var response = db.query('SELECT p.id, p.descricao,p.concluido,p.aprovado,p.agente_externo,p.disciplina_aloc FROM PROJETO as p WHERE id=$1', [req.params.idProjeto]).then(response =>{
        res.json(response.rows)
    })
    .catch((response) => {
        res.status(400);
    })
})

router.get('/projeto/consulta', (req, res) =>{
    var response = db.query('SELECT * FROM PROJETO').then(response =>{
        res.json(response.rows)
    })
})


module.exports = router