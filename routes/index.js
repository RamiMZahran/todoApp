const todoRoutes = require('./todoRoutes');

module.exports = function (app) {
  app.use('/todos', todoRoutes);
};
