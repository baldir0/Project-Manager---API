const router = require('express').Router();
const DB = require('./../../db');

router
  .get('/', async (req, res) => {
    try {
      const response = await DB.getAllListTasks(req.listId);
      res.status(200).send(response);
    } catch (e) {
      res.sendStatus(404);
    }
  })
  .get('/id=:taskId', async (req, res) => {
    try {
      const response = await DB.getTaskDetails(req.params.taskId);
      res.status(200).send(response);
    } catch (e) {
      res.sendStatus(404);
    }
  })
  .put('/', async (req, res) => {
    try {
      if ((!req.body.name)) return res.status(427).send('Name is needed');
      if ((!req.body.description)) return res.status(427).send('Description is needed');
      if ((!String(req.body.priorityId))) return res.status(427).send('Priority Id is Needed');

      const result = await DB.addListTask(req.listId, req.body.priorityId, req.body.name, req.body.description);
      if (result) return res.sendStatus(200);
      return res.sendStatus(404)
    } catch (e) {
      res.sendStatus(404);
    }
  })
  .delete('/id=:taskId', async (req, res) => {
    try {
      const result = DB.deleteListTask(req.params.taskId);
      if (result) return res.sendStatus(200);
      return res.sendStatus(404)
    } catch (e) {
      res.sendStatus(404);
    }
  })

module.exports = router;
