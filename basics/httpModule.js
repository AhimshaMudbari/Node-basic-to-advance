const http = require('http');
const { json } = require('stream/consumers');
// console.log(http);

const server = http.createServer((req, res) => {
  if (req.url == '/') {
    res.write('Working fine...');
    res.end();
  } else {
    console.log('error');
  }
  if (req.url === '/api/name') {
    res.write(JSON.stringify(['ahim', 'arzoo']));
    res.end();
  }
});

const port = server.listen(3301);
console.log(`listining to port ${port}`);
