function PosNeg(number) {
  return number >= 0 ? number : -number;
  //   if (number >= 0) return number;
  //   return -number;
}

function strTest(s) {
  return 'Hello' + s;
}

function arrayTest() {
  return ['GOT', 'Rio', 'Harry potter'];
}

function objTest(characterId) {
  return { id: characterId, house: 'Stark', character: 'jon snow', age: 27 };
}

function exceptionTest(username) {
  if (!username) throw new Error('username is required');
  return { id: new Date().getTime(), username: username };
}

module.exports.arr = arrayTest;
module.exports.str = strTest;
module.exports.PosNeg = PosNeg;
module.exports.obj = objTest;
module.exports.expectionTest = exceptionTest;
