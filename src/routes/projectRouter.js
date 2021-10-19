const express = require('express');

const router = express.Router();
const db = require('../../dbconfig/dbConfig');
const projectController = require('../controller/ProjectController');

router.post('/upload', async (req, res) => {
  projectController.addFile(req.body).then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

router.post('/projeto/cadastro', (req, res) => { // Falta tratamento dos dados
  projectController.addProject(req.body).then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

router.post('/projeto/deletar/:projectId', (req, res) => { // Falta tratamento dos dados
  projectController.deleteProject(req.params.projectId).then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

router.get('/areas-conhecimento', (req, res) => {
  projectController.getKnowledgeAreas(req.body).then((response) => {
    res.status(200).json({ response });
  }).catch((response) => {
    res.status(400).json({ response });
  });
});

router.get('/projeto/consulta', () => {
  db.query('SELECT * FROM PROJECT').then((res) => {
    res.json(res.rows);
  });
});

module.exports = router;
