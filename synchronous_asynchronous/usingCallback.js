console.log('run 1....');
//christmas tree problem or callback hell
// getCallback(11, (user) => {
//   getData(user.username, (data) => {
//     console.log(data);
//   });
// });

getCallback(11, forUser);
console.log('run 2....');

//solving christmas tree problem or callback hell

function forUser(user) {
  getData(user.username, forData);
}
function forData(data) {
  console.log(data);
}

function getCallback(id, c) {
  setTimeout(() => {
    console.log('running....');
    c({ id: id, username: 'ahimsha' });
  }, 2000);
}

function getData(username, c) {
  setTimeout(() => {
    console.log('this is running......');
    console.log(`${username} datas:`);
    c(['data1', 'data2']);
    return;
  }, 2000);
}
