const mongoose = require('mongoose');
require('dotenv').config();

const mongoCon = process.env.MONGOO;

mongoose
  .connect(mongoCon)
  .then(() => {
    console.log('connected successfully');
  })
  .catch((err) => {
    console.error('not connected', err);
  });

const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    name: String,
    released: Number,
  })
);
const Director = mongoose.model(
  'Director',
  new mongoose.Schema({
    name: {
      type: Array,
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message: 'There should be atleast one director',
      },
    },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
    },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie Genre',
    },
  })
);

const Genre = mongoose.model(
  'Movie Genre',
  new mongoose.Schema({
    genreName: {
      type: Array,
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message:
          'genre should be defined or there should be more than one genre',
      },
    },
  })
);

async function createGenre() {
  const g = new Genre({
    genreName: ['Comedy', 'Animated', 'Adventure'],
  });
  const result = await g.save();
  console.log(result);
}
// createGenre();

async function createMovie() {
  const movie = new Movie({
    name: 'Aladdin',
    released: 2000,
  });
  const r = await movie.save();
  console.log(r);
}
// createMovie();

async function createDirector(name, movie, genre) {
  const dir = new Director({
    name,
    movie,
    genre,
  });
  const result = await dir.save();
  console.log(result);
}
// createDirector(
//   'Ahimsha Mudbari',
//   '62ec8db78aea48a3b0bbe5e9',
//   '62ec9721972cdaa57d3c6a62'
// );

async function showDirectors() {
  const director = await Director.find()
    .populate('movie', 'name -_id')
    .populate('genre', '-_id genreName')
    .select();
  console.log(director);
}
showDirectors();
