const express = require('express');
const app = express();
// const Joi = require('joi');
const genres = require('./routes/genres');
const home = require('./routes/home');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/', home);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
