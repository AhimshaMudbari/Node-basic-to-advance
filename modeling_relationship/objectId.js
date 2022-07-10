const mongoose = require('mongoose');

const id = mongoose.Types.ObjectId();
console.log(id);
console.log(id.getTimestamp());

// const isValid = mongoose.Types.ObjectId.isValid('62ca5aee76ebcf429af9db5c');
const isValid = mongoose.Types.ObjectId.isValid('mynameis12345');

console.log(isValid);

// 62ca5aee76ebcf429af9db5c
// first 4 bytes(62ca5aee) --> Timestamp
// 3 bytes(76ebcf) --> machine  identifier
// 2 bytes(429a) --> process identifier
// 3 bytes(f9db5c) --> counter
