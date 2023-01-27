const router = require('express').Router();
const DB = require('./../../db');
const listRouter = require('./../lists');

router.use('/id=:id/list', (req, res, next) => {
  req.projectId = req.params.id;
  next();
} ,listRouter);

router
  .get('/', async (req, res) => {
    try {
      const projects = await DB.getAllProjects();
      res.status(200).send(projects);
    } catch (e) {
      console.log(e);
      res.status(404).send('ERROR: ' + e.message);
    }
  })
  .get('/id=:id', async (req, res) => {
    try {
      const projectDetails = await DB.getProjectDetails(req.params.id);
      res.status(200).send(projectDetails);
    } catch (e) {
      res.status(404).send('ERROR: ' + e.message);
    }
  })
  .put('/', async (req, res) => {
    console.log(req.body);
    if (!req.body.name) return res.status(424).send("Name is not provided!");
    if (!req.body.description) return res.status(424).send("Description is not provided!");

    try {
      const result = await DB.addProject(req.body.name, req.body.description);
      if (result) return res.sendStatus(200);
      return res.sendStatus(404);
    } catch (e) {
      res.status(404).send('ERROR: ' + e.message);
    }
  })
  .delete('/id=:id', async (req, res) => {
    const id = req.params.id;
    const result = await DB.deleteProject(id);
    if (result) return res.sendStatus(200);
    return res.sendStatus(404);
  })

module.exports = router;
