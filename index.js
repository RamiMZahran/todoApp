const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

require('./routes/index')(app);

const main = async () => {
  try {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://127.0.0.1:27017/TodoApp');
  } catch (err) {
    console.error(err.stack);
    process.exit(0);
  }

  const port = process.env.port || 3000;
  app.listen(port, () => {
    console.log('Started on port ' + port);
  });
};

process.setMaxListeners(0);

main().then().catch(console.error);

module.exports = app;
