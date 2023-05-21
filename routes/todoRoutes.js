const express = require('express');
const appRouter = express.Router();

const todoController = require('../controllers/todos');

appRouter.post(
  '/',
  todoController.validate('createTodo'),
  todoController.createTodo
);

appRouter.get('/:id', todoController.getTodo);

appRouter.delete('/:id', todoController.deleteTodo);

appRouter.patch(
  '/:id',
  todoController.validate('updateTodo'),
  todoController.updateTodo
);

module.exports = appRouter;
