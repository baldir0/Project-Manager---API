const { Sequelize, DataTypes } = require('sequelize');
const Models = require('./models');
class DB {
  constructor() {
    this.connect();
    this.checkConnection();
    this.initModels();
  }
  connect = () => {
    this.sequelize = new Sequelize(process.env.DB_SCHEMA,
      process.env.DB_LOGIN,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: "mysql",
      });
  }
  checkConnection = () => {
    return this.sequelize.authenticate()
      .then(() => {
        console.log("Connected to DB");
      })
      .catch((err) => {
        console.log("Failed to connect to DB", err);
      });
  }
  initModels = () => {
    this.M_priority = Models.priority(this.sequelize, DataTypes);
    this.M_projects = Models.projects(this.sequelize, DataTypes);
    this.M_lists = Models.lists(this.sequelize, DataTypes, this.M_projects);
    this.M_tasks = Models.tasks(this.sequelize, DataTypes, this.M_lists, this.M_priority);

    this.M_projects.hasMany(this.M_lists, {
      onDelete: 'CASCADE',
      hooks: true,
    });
    this.M_lists.hasMany(this.M_tasks, {
      onDelete: 'CASCADE',
      hooks: true,
    });
    this.M_tasks.belongsTo(this.M_priority);
  }
  getAllProjects = async () => {
    return await this.M_projects.findAll();
  }
  addProject = async (name, description) => {
    return await this.M_projects.create({
      name: name,
      description: description,
    });
  }
  deleteProject = async (id) => {
    const listToDelete = await this.M_lists.findAll({
      where: {projectId: id}
    })
    listToDelete.forEach((list) => {
      this.M_tasks.destroy({
        where: {listId: list.id}
      })
    })
    await this.M_lists.destroy({
      where: {projectId: id}
    })
    const result = await this.M_projects.destroy({
      where: {
        id: id
      }
    })
    return result;
  }
  getAllPriorities = async () => {
    return await this.M_priority.findAll();
  }
  getAllProjectLists = async (projectId) => {
    return await this.M_lists.findAll({ where: {projectId: projectId}});
  }
  addProjectList = async (projectId, name) => {
    return await this.M_lists.create({
      projectId: projectId,
      name: name,
    })
  }
  deleteProjectList = async (listId) => {
    await this.M_tasks.destroy({
      where: { listId: listId }
    })
    return await this.M_lists.destroy({
      where: { id: listId }
    });
  }
  getListDetails = async (listId) => {
    return await this.M_lists.findAll({
      where: {
        id: listId
      },
      include: [
        {
          model: this.M_tasks,
          include: [
            {
              model: this.M_priority
            },
          ]
        }
      ]
    })
  }
  getAllListTasks = async (listId) => {
    return await this.M_tasks.findAll({where: {listId: listId}});
  }
  addListTask = async (listId, priorityId, name, description) => {
    return await this.M_tasks.create({
      listId: Number(listId),
      priorityId: Number(priorityId),
      name: name,
      description: description,
    })
  }
  deleteListTask = async (taskId) => {
    return await this.M_tasks.destroy({
      where: { id: taskId }
    });
  }
  getTaskDetails = async (taskId) => {
    return await this.M_tasks.findAll({
      where: {
        id: taskId
      },
      include: [
        {
          model: this.M_priority
        },
      ]
    })
  }
  getProjectDetails = async (projectId) => {
    try {
      return await this.M_projects.findAll({
        where: {
          id: projectId,
        },
        include: [
          {
            model: this.M_lists,
            include: [
              {
                model: this.M_tasks,
                include: [
                  {
                    model: this.M_priority
                  },
                ]
              }
            ]
          }
        ]
      });
    } catch (e) {
      console.log(e);
    }
  }
}

const DB_ACCESS = new DB();

module.exports = DB_ACCESS;
