const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model(
  'Genre',
  mongoose.Schema({
    name: { type: String, require: true, minlength: 3, maxlength: 15 },
    date: { type: Date, default: Date.now },
  })
);

validategenre = (g) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(g);
};
exports.Genre = Genre;
exports.validate = validategenre;
