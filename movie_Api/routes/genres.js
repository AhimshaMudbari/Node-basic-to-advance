const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model(
  'Genre',
  mongoose.Schema({
    name: { type: String, require: true, minlength: 3, maxlength: 15 },
    date: { type: Date, default: Date.now },
  })
);
router.get('/', async (req, res) => {
  const genre = await Genre.find().sort({ name: 1 });
  res.send(genre);
});

router.get('/:id', async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre) return res.status(404).send('genre not found');
  res.send(genre);
});

router.post('/', async (req, res) => {
  const { error } = validategenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  res.send(genre);
});

router.put('/:id', async (req, res) => {
  const { error } = validategenre(req.body);
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

router.delete('/:id', async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre) return res.status(404).send(`genre of id not found`);

  res.send(genre);
});

validategenre = (g) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(g);
};
module.exports = router;
