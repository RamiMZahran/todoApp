const { expressjwt } = require('express-jwt');

const todoRoutes = require('./todoRoutes');
const userRoutes = require('./userRoutes');

module.exports = function (app) {
  app.use(
    expressjwt({
      secret: process.env.JWT_SECRET,
      algorithms: ['HS256'],
    }).unless({
      path: ['/users/register', '/users/login'],
    })
  );
  app.use('/todos', todoRoutes);
  app.use('/users', userRoutes);
};
