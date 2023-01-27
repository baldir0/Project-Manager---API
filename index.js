require('dotenv').config();
const express = require('express');
const cors = require('cors');
const DB = require('./db');

const projectsRouter = require('./routers/projects');

const PORT = process.env.API_PORT;
const API = express();



API.use(cors());
API.use(express.json());
API.use((req, res, next) => {
  const date = new Date();
  console.log(`[${date.toLocaleDateString()} - ${date.toLocaleTimeString()}] - Req: ${req.path}, Method: ${req.method}`);
  next();
})

API.get('/', async (req, res) => {
  res.sendStatus(200);
})

// API.get('/projects', async (req, res) => {
//   try {
//     const projects = await DB.getAllProjects();
//     res.status(200).send(projects);
//   } catch (e) {
//     res.sendStatus(404);
//   }
// })

API.use('/projects', projectsRouter);

// API.get('/projects/id=:id', async (req, res) => {
//   try {
//     const data = await DB.getProjectDetails(req.params.id);
//     res.status(200).send(data);
//   } catch (e) {
//     res.sendStatus(404);
//   }
// })

API.get('/lists/:id', async (req, res) => {
  try {
    const lists = await DB.getAllListsInProject(req.params.id);
    res.status(200).send(lists);
  } catch (e) {
    res.sendStatus(404);
  }
})

API.get('/priorities', async (req, res) => {
  try {
    const priorities = await DB.getAllPriorities();
    res.status(200).send(priorities)
  } catch (e) {
    res.sendStatus(404);
  }
})

API.listen(PORT, async (req, res) => {
  console.log(`API is listening on port ${PORT}`);
})
