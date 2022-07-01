const express = require('express');
const router = express.Router();

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
router.get('/', (req, res) => {
  res.send(movies);
});
router.get('/:id', (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('movie not found');
  res.send(movie);
  console.log('movie fetched successfully');
});

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send(`movie of ${id} not found`);

  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  movie.name = req.body.name;

  res.send(movie);
  console.log('movie updated successfully');
});

router.delete('/:id', (req, res) => {
  const movie = movies.find((m) => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('movie not found to delete');

  const index = movies.indexOf(movie);
  movies.splice(index, 1);

  res.send(movie);
  console.log('movie deleted successfully');
});

module.exports = router;
