module.exports.displayAdd = function (a, b) {
  return a + b;
};
module.exports.displaySubtract = (a, b) => {
  return a - b;
};

module.exports.displayMultiply = (a, b) => {
  return a * b;
};
module.exports.displayDivid = (a, b) => {
  try {
    return a / b;
  } catch (Error) {
    console.log('error');
  }
};
