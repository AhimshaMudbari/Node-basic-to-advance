//promise is an object that holds the eventual result of an asynchronous operation
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve('ahimsha');
    reject(new Error('error message'));
  }, 1000);
});
promise
  .then((result) => console.log(result))
  .catch((err) => console.log(err.message))
  .finally(console.log('finally bheityo'));

//state of promise are--> pending, resolve, reject
