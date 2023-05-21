const todoService = require('../services/todoService');
const { body, validationResult } = require('express-validator');

exports.validate = (method) => {
  switch (method) {
    case 'createTodo': {
      return [body('text').isString()];
    }
    case 'updateTodo': {
      return [
        body('text').isString().optional(),
        body('completed').isBoolean().optional(),
      ];
    }
  }
};

exports.createTodo = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .send({ error: 'Invalid request body', details: errors.array() });
  }

  try {
    const todo = await todoService.createTodo(req.body.text);
    return res.status(201).send({ msg: 'Todo created', data: todo });
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Error creating todo', details: err.stack });
  }
};

exports.getTodo = async (req, res) => {
  try {
    const todo = await todoService.getTodo(req.params.id);
    return res
      .status(200)
      .send({ msg: 'Todo fetched successfully', data: todo });
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Error fetching todo', details: err.stack });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    await todoService.deleteTodo(req.params.id);
    return res.status(200).send({ msg: 'Todo deleted successfully' });
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Error deleting todo', details: err.stack });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await todoService.updateTodo(
      req.params.id,
      req.body.text,
      req.body.completed
    );
    return res
      .status(200)
      .send({ msg: 'Todo updated successfully', data: todo });
  } catch (err) {
    return res
      .status(400)
      .send({ error: 'Error deleting todo', details: err.stack });
  }
};
