// eslint-disable-next-line import/no-unresolved
const express = require('express');

const router = express.Router();
const projectRoutes = require('./projectRouter');

router.get('/', (req, res) => {
  res.json({
    Project: 'Puma',
  });
});

module.exports = (app) => {
  app.use('/', [projectRoutes]);
};
