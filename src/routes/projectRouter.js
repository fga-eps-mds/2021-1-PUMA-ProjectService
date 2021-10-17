const express = require("express");
const router = express.Router();
const db = require('../../dbconfig/dbConfig');
const projectController = require("../controller/ProjectController");
const {response} = require("express");

router.post('/upload', async (req, res) => {
    console.log(req.body);
    projectController.addFile(req.body).then((res) => {
        res.status(200).json({ res });
    }).catch(() => {
        console.log(res);
        res.status(400).json({ res });
    });
});

router.post('/projeto/cadastro', (req, res) => {//Falta tratamento dos dados
    projectController.addProject(req.body).then((res) => {
        res.status(200).json({ res });
    }).catch(() => {
        res.status(400).json({ res });
    });

});

router.post('/projeto/deletar/:projectId', (req, res) => {//Falta tratamento dos dados
    projectController.deleteProject(req.params.projectId).then((res) => {
        res.status(200).json({ res });
    }).catch(() => {
        res.status(400).json({ res });
    });
});

router.get('/projeto/visualizar-arquivo/:idArquivo', (req, res) =>{
    db.query('SELECT f.bytecontent, f.filename FROM FILE as f WHERE fileid=$1', [req.params.idArquivo]).then(res =>{
        res.json(res.rows)
    })
});

router.get('/projeto/visualizar/:idProjeto', (req, res) => {
    db.query('SELECT p.name, p.problem,p.expectedresult,p.status,p.knowledgearea FROM PROJECT as p WHERE projectid=$1', [req.params.idProjeto]).then(res =>{
        res.json(res.rows)
    })
    .catch(() => {
        res.status(400);
    })
});

router.get('/areas-conhecimento', (req, res) => {
    projectController.getKnowledgeAreas(req.body).then((res) => {
        res.status(200).json({ res });
    }).catch(() => {
        res.status(400).json({ res });
    });
});

router.get('/projeto/consulta', (req, res) =>{
    db.query('SELECT * FROM PROJECT').then(res =>{
        res.json(res.rows)
    })
});

module.exports = router;