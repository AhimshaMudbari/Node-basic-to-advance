const express = require('express');
const morgan = require('morgan');
const app = express();
const config = require('config');
const array = [1, 2, 3, 4, 5, 6, 7];

//configuration
console.log(`Application name: ${config.get('name')}`);
console.log(`Mail server: ${config.get('mail.host')}`);
console.log(`mail password: ${config.get('mail.password')}`);

app.use(express.json());
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  console.log('morgan enabled');
} else {
  console.log('morgan disabled in production');
}

app.get('/', (req, res) => {
  res.send(array);
});
app.listen(2020, () => {
  console.log('listening to 2020');
});

//code runs either in testing, development(default), production , stagging
