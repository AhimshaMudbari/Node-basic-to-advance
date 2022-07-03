const p = Promise.resolve({ id: 1, name: 'ahim mudbari' });
p.then((res) => console.log(`The id is ${res.id} and name is ${res.name}`));

const p1 = Promise.reject(new Error('promise rejected')); //gives call stack
// const p1 = Promise.reject('promise rejected'); //dont give call stack
p1.catch((res) => console.log(res.message)); //dont give call stack
// p1.catch((res) => console.log(res)); //gives call stack

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('op 1...');
    // reject(new Error('error occured'));
    resolve(1);
  }, 2000);
});

const p4 = new Promise((resolve) => {
  setTimeout(() => {
    console.log('op 2...');
    resolve(11);
  }, 2000);
});

// Promise.all([p3, p4])
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err.message));

Promise.race([p3, p4])
  .then((res) => console.log(res))
  .catch((err) => console.log(err.message));
//it gives value of first fulfilled promise
