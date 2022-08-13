const express = require('express');
const app = express();
const Joi = require('joi');
const genres = require('./routes/genres');
const home = require('./routes/home');
const rentals = require('./routes/rentals');
const customer = require('./routes/customers');
const movies = require('./routes/movies');
const users = require('./routes/users');
const authentication = require('./routes/authentication');
Joi.objectId = require('joi-objectid')(Joi);

const { default: mongoose } = require('mongoose');
const error = require('./middleware/error');
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
app.use('/api/customers', customer);
app.use('/api/rentals', rentals);
app.use('/api/movies', movies);
app.use('/api/users', users);
app.use('/api/auth', authentication);

app.use(error);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
