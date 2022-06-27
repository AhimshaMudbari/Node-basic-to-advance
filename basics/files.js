const file = require('fs');

// console.log(file);
//synchronous method
// const readfile = file.readdirSync('./');
// console.log(readfile);

//asynchronous method
file.readdir('./', (err, readfileasync) => {
  if (err) {
    console.log('error:', err);
  } else {
    console.log(readfileasync);
  }
});
