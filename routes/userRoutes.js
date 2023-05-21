const express = require('express');
const appRouter = express.Router();

const userController = require('../controllers/users');

appRouter.post(
  '/register',
  userController.validate('register'),
  userController.register
);

appRouter.post(
  '/login',
  userController.validate('login'),
  userController.login
);
module.exports = appRouter;
