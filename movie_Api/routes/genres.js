const express = require('express');
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const router = express.Router();
const { Genre, validate } = require('../models/genre');

router.get('/', async (req, res, next) => {
  try {
    const genre = await Genre.find().sort({ name: 1 });
    res.send(genre);
  } catch (ex) {
    next(ex);
  }
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('genre not found');
  res.send(genre);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  if (!genre) return res.status(404).send(`genre of id not found`);
  res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send(`genre of id not found`);

  res.send(genre);
});

module.exports = router;
