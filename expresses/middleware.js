const { json } = require('express');
const express = require('express');
// const logger = require('./middleware/middleware_logger');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const movies = require('./routes/movies');
const home = require('./routes/home');
//middlewares functions
app.use(express.json());
// app.use(logger);
app.use(express.urlencoded({ extended: true })); //key and value ....test in postman
app.use(express.static('public')); //use to serve static files where public is name of folder
app.use(helmet());
app.use(morgan('tiny'));

app.use('/api/movies', movies);

app.use('/', home);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
validateMovie = (movie) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(movie);
};
