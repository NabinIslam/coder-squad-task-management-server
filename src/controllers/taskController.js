const Task = require('../models/taskModel');
const createError = require('http-errors');
const { successResponse } = require('./responseController');

const handleCreateTask = async (req, res, next) => {
  try {
    const { title, description, date, taskOf } = req.body;

    const newTask = await Task.create({ title, description, date, taskOf });

    if (!newTask) throw createError(404, 'Could not create the task');

    return successResponse(res, {
      statusCode: 200,
      message: `Task created successfully`,
      payload: newTask,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetAllTasks = async (req, res, next) => {
  try {
    let filter = {};

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const tasks = await Task.find(filter)
      .populate('taskOf')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (!tasks) throw createError(404, 'Count not found the tasks');

    const count = await Task.find(filter).countDocuments();

    const tasksData = {
      tasks,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      previousPage: page - 1,
      nextPage: page + 1,
    };

    return successResponse(res, {
      statusCode: 200,
      message: `Fetched all tasks successfully`,
      payload: {
        tasks: tasksData.tasks,
        pagination: {
          totalPages: tasksData.totalPages,
          currentPage: tasksData.currentPage,
          previousPage: tasksData.currentPage - 1,
          nextPage: tasksData.currentPage + 1,
          totalNumberOfTasks: tasksData.count,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const handleGetATaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOne({ _id: id }).populate('taskOf');

    if (!task) throw createError(404, 'Count not found the task');

    return successResponse(res, {
      statusCode: 200,
      message: `Fetched the task successfully`,
      payload: task,
    });
  } catch (error) {
    next(error);
  }
};

const handleDeleteATaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findOneAndDelete({ _id: id }).populate('taskOf');

    if (!task) throw createError(404, 'Count not delete the task');

    return successResponse(res, {
      statusCode: 200,
      message: `Task deleted successfully`,
      payload: task,
    });
  } catch (error) {
    next(error);
  }
};

const handleUpdateTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { title, description, date, isCompleted, taskOf } = req.body;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id },
      { $set: { title, description, date, isCompleted, taskOf } },
      { new: true }
    ).populate('taskOf');

    if (!updatedTask) throw createError(404, 'Could not update the task');

    return successResponse(res, {
      statusCode: 200,
      message: `Task updated successfully`,
      payload: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

const handleGetTasksById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const tasks = await Task.find({ taskOf: id })
      .populate('taskOf')
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    if (!tasks) throw createError(404, `Could not find the tasks`);

    const count = await Task.find({ taskOf: id }).countDocuments();

    const tasksData = {
      tasks,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      previousPage: page - 1,
      nextPage: page + 1,
    };

    return successResponse(res, {
      statusCode: 200,
      message: `Fetched all tasks successfully`,
      payload: {
        tasks: tasksData.tasks,
        pagination: {
          totalPages: tasksData.totalPages,
          currentPage: tasksData.currentPage,
          previousPage: tasksData.currentPage - 1,
          nextPage: tasksData.currentPage + 1,
          totalNumberOfTasks: tasksData.count,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleCreateTask,
  handleGetAllTasks,
  handleGetATaskById,
  handleDeleteATaskById,
  handleUpdateTaskById,
  handleGetTasksById,
};
