const router = require('express').Router();
const DB = require('./../../db');
const taskRouter = require('./../tasks');

router.use('/id=:listId/task', (req, res, next) => {
  req.listId = req.params.listId;
  next();
}, taskRouter);

router
  .get('/', async (req, res) => {
    try {
      const response = await DB.getAllProjectLists(req.projectId);
      res.status(200).send(response);
    } catch (e) {
      res.sendStatus(404);
    }
  })
  .get('/id:listId', async (req, res) => {
    try {
      const response = await DB.getListDetails(req.props.listId);
      res.status(200).send(response);
    } catch (e) {
      res.sendStatus(404);
    }
  })
  .put('/', async (req, res) => {
    try {
      if ((!req.body.name)) return res.status(427).send('Name is needed');
      const result = await DB.addProjectList(req.projectId, req.body.name);
      if (result) return res.sendStatus(200);
      return res.sendStatus(404)
    } catch (e) {
      res.sendStatus(404);
    }
  })
  .delete('/id=:listId', async (req, res) => {
    try {
      const result = DB.deleteProjectList(req.params.listId);
      if (result) return res.sendStatus(200);
      return res.sendStatus(404)
    } catch (e) {
      res.sendStatus(404);
    }
  })

module.exports = router;
