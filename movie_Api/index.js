const express = require('express');
const app = express();
// const Joi = require('joi');
const genres = require('./routes/genres');
const home = require('./routes/home');
const { default: mongoose } = require('mongoose');
require('dotenv').config();

const con = process.env.MONGO_CON;
mongoose
  .connect(con)
  .then(() => {
    console.log('connection successful');
  })
  .catch((err) => console.log('Db not connected', err));
app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
