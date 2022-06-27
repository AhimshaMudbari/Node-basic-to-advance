const _ = require('underscore');

var result = _.contains([1, 2, 3], 2);
console.log(result);
var calc = require('ahimsha');
let addition = calc.displayAdd(1, 1);
console.log(addition);
let p = 11,
  q = 7;
let subtraction = calc.displaySubtract(p, q);
console.log(`subtraction of ${p} and ${q} is ${subtraction}`);
