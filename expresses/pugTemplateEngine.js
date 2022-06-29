const express = require('express');
const app = express();

app.set('view engine', 'pug'); //compulsory //there are many view enjine like pug, mustache, ejs
app.set('views', './views'); //default //view folder should be at root

app.get('/', (req, res) => {
  res.render('index', { title: 'node pug', heading: 'learning pug with node' });
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
