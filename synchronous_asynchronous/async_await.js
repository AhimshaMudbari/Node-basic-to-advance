console.log('start point');

async function Results() {
  try {
    const m = await getMovie(11);
    const d = await getDirector(m.one);
    const h = await hadWatched(d[0]);
    console.log(h[0]);
  } catch (err) {
    console.log(err.message);
  }
}
Results();
console.log('stop point');

function getMovie(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('movie running...');
      resolve({ one: 'minnion', two: 'bad guy', three: 'Harry potter' });
    }, 2000);
  });
}

function getDirector(movie) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('director fetched...');
      resolve(['A', 'B', 'C']);
    }, 2000);
  });
}

function hadWatched(bool) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('had watched analysis...');
      resolve(['yes', 'no']);
    }, 2000);
  });
}
