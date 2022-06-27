var os = require('os');
// console.log(os);
var free = os.freemem();
var total = os.totalmem();
console.log(`Free memory : ${free}`);
console.log(`Total memory : ${total}`);
