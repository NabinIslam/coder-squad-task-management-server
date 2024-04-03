const express = require('express');
const {
  handleGetAllUsers,
  handleGetUserByEmail,
} = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get('/', handleGetAllUsers);
userRouter.get('/email/:email', handleGetUserByEmail);

module.exports = userRouter;
