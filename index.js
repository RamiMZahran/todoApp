const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

app.use(express.json());

require('./routes/index')(app);

const main = async () => {
  try {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGO_URL);
  } catch (err) {
    console.error(err.stack);
    process.exit(0);
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log('Started on port ' + port);
  });
};

process.setMaxListeners(0);

main().then().catch(console.error);

module.exports = app;
