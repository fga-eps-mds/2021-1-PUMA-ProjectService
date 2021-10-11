const express = require("express");
const router = express.Router();
const projectController = require('../controller/ProjectController')
const db = require('../../dbconfig/dbConfig');
const projectController = require("../controller/projectController");
const {response} = require("express");

router.post('/upload', async (req, res) => {
    console.log(req.body);
    projectController.addFile(req.body).then((response) => {
        res.status(200).json({ response });

    }).catch((response) => {
        console.log(response);

        res.status(400).json({ response });

    });
});

router.post('/projeto/cadastro', (req, res) => {//Falta tratamento dos dados
    projectController.addProject(req.body).then((response) => {
        res.status(200).json({ response });
    }).catch((response) => {
        res.status(400).json({ response });
    });

});

router.post('/projeto/deletar/:projectId', (req, res) => {//Falta tratamento dos dados
    projectController.deleteProject(req.params.projectId).then((response) => {
        res.status(200).json({ response });
    }).catch((response) => {
        res.status(400).json({ response });
    });
});

router.get('/projeto/visualizar-arquivo/:idArquivo', (req, res) =>{
    var response = db.query('SELECT f.bytecontent, f.filename FROM FILE as f WHERE fileid=$1', [req.params.idArquivo]).then(response =>{
        res.json(response.rows)
    })
});

router.get('/projeto/visualizar/:idProjeto', (req, res) => {
    var response = db.query('SELECT p.name, p.problem,p.expectedresult,p.status,p.knowledgearea FROM PROJECT as p WHERE projectid=$1', [req.params.idProjeto]).then(response =>{
        res.json(response.rows)
    })
    .catch((response) => {
        res.status(400);
    })
});

router.get('/areas-conhecimento', (req, res) => {
    projectController.getKnowledgeAreas(req.body).then((response) => {
        res.status(200).json({ response });
    }).catch((response) => {
        res.status(400).json({ response });
    });
});

router.get('/projeto/consulta', (req, res) =>{
    var response = db.query('SELECT * FROM PROJECT').then(response =>{
        res.json(response.rows)
    })
});

module.exports = router;