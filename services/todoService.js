const { Todo } = require('../models/todo');
exports.createTodo = async (text) => {
  const todo = {
    text,
  };
  try {
    return Todo.create(todo);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getTodo = async (id) => {
  return Todo.findById(id);
};

exports.deleteTodo = async (id) => {
  return Todo.deleteOne({ _id: id });
};

exports.updateTodo = async (id, text, completed) => {
  return Todo.updateTodo(id, text, completed);
};
