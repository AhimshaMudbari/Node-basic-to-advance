function fizzBuzz(input) {
  if (typeof input !== 'number') throw new Error('Input should be number');

  if (input % 3 === 0 && input % 5 === 0) return 'fizbuzz';

  if (input % 3 === 0) return 'fizz';

  if (input % 5 === 0) return 'buzz';

  return input;
}
module.exports.fizzBuzz = fizzBuzz;
