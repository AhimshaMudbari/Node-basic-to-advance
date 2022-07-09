const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const Movie = new mongoose.model(
  'Movies',
  mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 200,
    },
    dailyRentalRate: {
      type: Number,
      require: true,
      min: 0,
      max: 200,
    },
  })
);

function validateMovie(movie) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).required(),
    dailyRentalRate: Joi.number().min(0).required(),
  });
  return schema.validate(movie);
}
exports.validate = validateMovie;
exports.Movie = Movie;
