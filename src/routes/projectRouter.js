const express = require("express");
const router = express.Router();
const db = require('../../dbconfig/dbConfig');
const ProjectController = require("../controller/ProjectController");

router.post('/upload', async (req, res) => {
    console.log(req.body)
    const arquivo = {filename: req.files['file']['name'], bytecontent: req.files['file']['data'], projectid: req.body.projectid}
    db.query('INSERT INTO FILE(filename,bytecontent,projectid) VALUES ($1,$2,$3) RETURNING *', [arquivo.filename,arquivo.bytecontent,arquivo.projectid]);
    res.send(arquivo);
        // res.sendStatus(400);
});

router.post('/projeto/cadastro', async function(req, res) {//Falta tratamento dos dados
    try {
        res.json(await project.create(req.body));
    } catch (err) {
        console.error('Erro durante a criação do projeto', err.message);
    }
});

router.get('/projeto/visualizar-arquivo/:idArquivo', (req, res) =>{
    var response = db.query('SELECT f.bytecontent, f.filename FROM FILE as f WHERE fileid=$1', [req.params.idArquivo]).then(response =>{
        res.json(response.rows)
    })
});

router.post('/projeto/cadastro', async function(req, res) {
    try {
        res.json(await project.create(req.body));
    } catch (err) {
        console.error('Erro durante a criação do projeto', err.message);
    }
});

router.get('/projeto/visualizar/:idProjeto', (req, res) => {
    var response = db.query('SELECT p.name, p.problem,p.expectedresult,p.status,p.knowledgearea FROM PROJECT as p WHERE projectid=$1', [req.params.idProjeto]).then(response =>{
        res.json(response.rows)
    })
    .catch((response) => {
        res.status(400);
    })
});

router.get('/projeto/consulta', (req, res) =>{
    var response = db.query('SELECT * FROM PROJECT').then(response =>{
        res.json(response.rows)
    })
});

module.exports = router;