const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer');

router.get('/', async (req, res) => {
  const customer = await Customer.find();
  res.send(customer);
});
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let customer = Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  customer.save();
  res.send(customer);
});
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      isGold: req.body.isGold,
      name: req.body.name,
      phone: req.body.phone,
    },
    { new: true }
  );
  if (!customer)
    return res.status(404).send('customer of the id not found to updated');
  customer.save();
  res.send(customer);
});
router.delete('/:id', async (req, res) => {
  let customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) res.status(404).send('customer of the id not found to delete');
  res.send(customer);
});
router.get('/:id', async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).send('customer of that id not found');
  res.send(customer);
});

module.exports = router;
