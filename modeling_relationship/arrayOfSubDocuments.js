const mongoose = require('mongoose');
require('dotenv').config();

const con = process.env.MONGOO;
mongoose
  .connect(con)
  .then(() => {
    console.log('connection succesful');
  })
  .catch((err) => {
    console.error('not connected', err.message);
  });

const gameSchema = new mongoose.Schema({
  name: String,
  creator: String,
  isPublished: Boolean,
});
const Game = mongoose.model('Game', gameSchema);

const Level = mongoose.model(
  'Level',
  new mongoose.Schema({
    gameName: [gameSchema],
    lvlName: String,
    lvlStage: {
      type: Array,
      required: function (v) {
        return v && v.length > 0;
      },
    },
  })
);

async function createGame(name, creator, isPublished) {
  const game = new Game({
    name,
    creator,
    isPublished,
  });
  const result = await game.save();
  console.log(result);
}
// createGame('COC', 'SuperCell', true);

async function createLevel(gameName, lvlName, lvlStage) {
  const lvl = new Level({
    gameName,
    lvlName,
    lvlStage,
  });
  const result = await lvl.save();
  console.log(result);
}
// createLevel(
//   [
//     new Game({ name: 'clash Royal', creator: 'supercell', isPublished: true }),
//     new Game({
//       name: 'FIFA',
//       creator: 'Esport',
//       isPublished: true,
//     }),
//   ],
//   'godzilla',
//   ['level 1', 'level 2']
// );

async function addGame(lvlid, gameName) {
  let game = await Level.findById(lvlid);
  game.gameName.push(gameName);
  const result = await game.save();
  console.log(result);
}
// addGame(
//   '62ed2cbcee96ac204df49c5c',
//   new Game({ name: 'star wars', creator: 'esport' })
// );

async function removeGame(levelid, gameid) {
  const lvl = await Level.findById(levelid);
  const game = await lvl.gameName.id(gameid);
  game.remove();
  const result = await lvl.save();
  console.log(result);
}
removeGame('62ed2cbcee96ac204df49c5c', '62ed34e2ff3563c1eece2527');
