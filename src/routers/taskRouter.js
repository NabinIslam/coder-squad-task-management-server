const express = require('express');
const {
  handleCreateTask,
  handleGetAllTasks,
  handleGetATaskById,
  handleDeleteATaskById,
  handleUpdateTaskById,
  handleGetTasksById,
} = require('../controllers/taskController');
const validate = require('../middlewares/validateMiddleware');
const taskSchema = require('../validators/taskValidator');

const taskRouter = express.Router();

taskRouter.post('/', validate(taskSchema), handleCreateTask);
taskRouter.get('/', handleGetAllTasks);
taskRouter.get('/id/:id', handleGetATaskById);
taskRouter.delete('/id/:id', handleDeleteATaskById);
taskRouter.put('/id/:id', handleUpdateTaskById);
taskRouter.get('/user/id/:id', handleGetTasksById);

module.exports = taskRouter;
