const { json } = require('express');
const express = require('express');
// const logger = require('./middleware_logger');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const Joi = require('joi');
const movies = [
  {
    id: 1,
    name: 'Rio',
  },
  {
    id: 2,
    name: 'Despicable me',
  },
];

//middlewares functions
app.use(express.json());
// app.use(logger);
app.use(express.urlencoded({ extended: true })); //key and value ....test in postman
app.use(express.static('public')); //use to serve static files where public is name of folder
app.use(helmet());
app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.send('hello world');
});

app.get('/api/movies', (req, res) => {
  res.send(movies);
});

app.get('/api/movies/:id', (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('movie not found');
  res.send(movie);
  console.log('movie fetched successfully');
});

app.post('/api/movies', (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error);

  const movie = {
    id: movies.length + 1,
    name: req.body.name,
  };
  movies.push(movie);
  res.send(movie);
  console.log('movie added successfully');
});

app.put('/api/movies/:id', (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send(`movie of ${id} not found`);

  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  movie.name = req.body.name;

  res.send(movie);
  console.log('movie updated successfully');
});

app.delete('/api/movies/:id', (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('movie not found to delete');

  const index = movies.indexOf(movie);
  movies.splice(index, 1);

  res.send(movie);
  console.log('movie deleted successfully');
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

validateMovie = (movie) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(movie);
};
