const { Todo } = require('../models/todo');
exports.createTodo = async (text, userId) => {
  const todo = {
    text,
    userId,
  };
  try {
    return Todo.create(todo);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getTodo = async (id, userId) => {
  return Todo.findOne({ _id: id, userId });
};

exports.getAll = async (userId) => {
  return Todo.find(userId);
};

exports.deleteTodo = async (id, userId) => {
  return Todo.deleteOne({ _id: id, userId });
};

exports.updateTodo = async (id, text, completed, userId) => {
  return Todo.updateTodo(id, text, completed, userId);
};
