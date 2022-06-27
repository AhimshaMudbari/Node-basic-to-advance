console.log(__filename);
console.log(__dirname);
console.log(require);
console.log(exports);
const url = 'http://ahim.com';

function log(msg) {
  console.log(msg);
}
module.exports.log = log;
module.exports.url = url;
