const express = require('express');
const router = express.Router();
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/user');

router.get('/individual', async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let existance = await User.findOne({ email: req.body.email });
  if (existance) return res.status(400).send('user already registered');

  //   const user = new User({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password,
  //   });

  const user = new User(_.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  //   res.send(user);

  //send only email and username
  //   res.send({
  //     name: user.name,
  //     email: user.email,
  //   });
  const token = user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ['name', 'email']));
});

module.exports = router;
