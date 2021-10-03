const { response } = require('express');
const express = require('express');
const dbConfig = require('./dbconfig/dbConfig');
const router = express.Router();
const db = require('./dbconfig/dbConfig');
const project = require('./services/ProjectService');
const multer  = require('multer')
const upload = multer({ dest: './uploads' })

router.get('/', (req, res) =>{
    res.json({
        Project: "Puma"
    });
});

router.post('/upload', async (req, res) => {
    const arquivo = {filename: req.files['file']['name'], bytecontent: req.files['file']['data'], projectid: 1}
    db.query('INSERT INTO FILE(filename,bytecontent,projectid) VALUES ($1,$2,$3) RETURNING *', [arquivo.filename,arquivo.bytecontent,arquivo.projectid]);
    res.send(arquivo);
        // res.sendStatus(400);
})

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
})

router.post('/projeto/cadastro', async function(req, res) {
    console.log(req.body.file);
    try {
        res.json(await project.create(req.body));
    } catch (err) {
        console.error('Erro durante a criação do projeto', err.message);
    }
});

router.get('/projeto/visualizar/:idProjeto', (req, res) =>{
    var response = db.query('SELECT p.name, p.problem,p.expectedresult,p.status,p.knowledgearea FROM PROJETO as p WHERE id=$1', [req.params.idProjeto]).then(response =>{
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