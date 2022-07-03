//using callback call back hell problem
// console.log('1');
// firstCallback(11, (user) => {
//   console.log(user);
//   secondCallback(user.uname, (data) => {
//     console.log(data);
//   });
// });
// console.log('2');

// function firstCallback(id, callback) {
//   setTimeout(() => {
//     console.log('working.................');
//     callback({ id: id, uname: 'ahimsha mudbari' });
//     return;
//   }, 2000);
// }

// function secondCallback(username, callback) {
//   setTimeout(() => {
//     console.log('working 2............');
//     console.log(`The user name is ${username}`);
//     callback(['data 1', 'data 2']);
//     return;
//   }, 2000);
// }

//using promise solution to callback hell problem
console.log('1');
// firstCallback(11, (user) => {
//   console.log(user);
//   secondCallback(user.uname, (data) => {
//     console.log(data);
//     thirdCallback(data[0], detail);
//   });
// });

firstCallback(1)
  .then((user) => secondCallback(user.uname))
  .then((data) => thirdCallback(data[0]))
  .then((detail) => console.log(detail))
  .catch((err) => console.log('Error', err.message));

console.log('2');

function firstCallback(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('working.................');
      resolve({ id: id, uname: 'ahimsha mudbari' });
      reject(new Error('error...'));
    }, 2000);
  });
}

function secondCallback(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('working 2............');
      console.log(`The user name is ${username}`);
      resolve(['data 1', 'data 2']);
      reject(new Error('error 2...'));
    }, 2000);
  });
}

function thirdCallback(details) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('working 3....');
      console.log(`the data is ${details}`);
      resolve(['first detail', 'second details', 'third details']);
      reject(new Error('error 3...'));
    }, 2000);
  });
}
