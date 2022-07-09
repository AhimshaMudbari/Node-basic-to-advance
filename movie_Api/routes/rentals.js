const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
const mongoose = require('mongoose');

require('dotenv').config();

const con = process.env.MONGO_CONNECTION;

Fawn.init(con);

router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid Customer');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie');

  if (movie.numberInStock === 0) return res.status(400).send('movie not found');

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      movie: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  //   rental = await rental.save();
  //   movie.numberInStock--;
  //   movie.save();

  try {
    new Fawn.Task()
      .save('rentals', rental) //rentals is actual name of collection in db, hence case sensitive
      .update(
        'movies',
        { _id: movie._id },
        {
          $inc: { numberInStock: -1 },
        }
      )
      .run();

    res.send(rental);
  } catch (ex) {
    res.status(500).send('something went wrong');
  }
});

router.get('/:id', async (req, res) => {
  const rental = Rental.findById(req.params.id);
  if (!rental) return res.status(404).send('rental of that id not found');
  res.send(rental);
});
module.exports = router;
