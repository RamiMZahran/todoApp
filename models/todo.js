var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      minlength: 1,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    completedAt: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

todoSchema.statics.create = async (todo) => {
  return new Todo(todo).save();
};

todoSchema.statics.updateTodo = async (id, text, completed) => {
  const body = {};
  if (text) body.text = text;
  if (completed) {
    body.completed = completed;
    body.completedAt = new Date();
  }
  return Todo.findByIdAndUpdate({ _id: id }, { $set: body }, { new: true });
};

const Todo = mongoose.model('Todo', todoSchema, 'Todos');

module.exports = { Todo };
