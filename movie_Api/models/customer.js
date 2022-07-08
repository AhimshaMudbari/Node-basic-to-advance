const Joi = require('joi');
const { default: mongoose } = require('mongoose');
require('dotenv').config;

const Customer = mongoose.model(
  'Customer',
  mongoose.Schema({
    isGold: { type: Boolean, required: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
  })
);

function validateCustomer(result) {
  const joi = Joi.object({
    isGold: Joi.boolean().required(),
    name: Joi.string().required().max(15).min(2),
    phone: Joi.number().required().max(9899999999).min(9800000000),
  });
  return joi.validate(result);
}

module.exports.Customer = Customer;
exports.validate = validateCustomer;
