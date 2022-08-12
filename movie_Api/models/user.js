const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const jsonToken = process.env.JWT;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 25,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, jsonToken);
  return token;
};

const User = mongoose.model('Users', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    email: Joi.string().min(3).max(100).required().email(),
    password: Joi.string().min(3).max(100).required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
