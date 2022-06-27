const http = require('http');
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/api/contacts', (req, res) => {
  res
    .send
    // JSON.stringify([
    //   {
    //     id: 1,
    //     nam: 'Ahim',
    //     contact: '12345',
    //   },
    //   { id: 2, name: 'Arzoo', contact: '12345' },
    //   { id: 3, name: 'Arzhim', contact: '54321' },
    // ])
    ();
});
app.get('/api/contacts/:year/:month', (req, res) => {
  res.send(req.query);
});

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
