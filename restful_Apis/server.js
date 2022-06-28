const http = require('http');
const express = require('express');
const Joi = require('joi');
const { join } = require('path');
const app = express();

app.use(express.json());
const contacts = [
  {
    id: 1,
    name: 'Ahim',
    num: '12345',
  },
  {
    id: 2,
    name: 'Arzoo',
    num: '12345',
  },
];

app.get('/', (req, res) => {
  res.send('Ahim is working on node');
});

app.get('/api/contacts', (req, res) => {
  res.send(contacts);
});

app.post('/api/contacts', (req, res) => {
  // const schema = Joi.object({
  //   name: Joi.string().min(3).required(),
  //   contact: Joi.number().min(5).required(),
  // });
  // const result = schema.validate(req.body); //replaced with function validateContact created below

  const { error } = validateContact(req.body);

  console.log(error);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const contact = {
    id: contacts.length + 1,
    name: req.body.name,
    num: req.body.num,
  };

  contacts.push(contact);
  res.send(contact);
});

app.get('/api/contacts/:id', (req, res) => {
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (!contact) {
    res.status(404).send('The contact not found.');
    return;
  }
  res.send(contact);
});

app.put('/api/contacts/:id', (req, res) => {
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (!contact) {
    res.status(404).send('Contact not found');
    return;
  }

  const { error } = validateContact(req.body); // same as result.error
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  contact.name = req.body.name;
  contact.num = req.body.num;

  res.send(contact);
});

app.delete('/api/contacts/:id', (req, res) => {
  const contact = contacts.find((c) => c.id === parseInt(req.params.id));
  if (!contact) {
    res.status(404).send('contact unavailable');
    return;
  }
  const index = contacts.indexOf(contact);
  contacts.splice(index, 1);

  res.send(contact);
});

function validateContact(contact) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    num: Joi.number().min(5).required(),
  });
  return schema.validate(contact);
}

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});

// const ser = http.createServer((req, res) => {
//   if (req.url === '/') {
//     res.write('Hi from server');
//     res.end();
//   }
//   if (req.url === '/api/contacts') {
//     res.write(
//       JSON.stringify([
//         { id: 1, nam: 'Ahim', contact: '12345' },
//         { id: 2, name: 'Arzoo', contact: '12345' },
//       ])
//     );
//     res.end();
//   }
// });

// ser.listen(3000);
