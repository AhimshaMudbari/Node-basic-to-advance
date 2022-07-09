const Joi = require('joi');
const mongoose = require('mongoose');
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: 3,
    maxlength: 15,
  },
});
const Genre = mongoose.model('Genre', genreSchema);

function validategenre(g) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(g);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validategenre;
