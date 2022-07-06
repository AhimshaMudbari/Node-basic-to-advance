const mongoose = require('mongoose');
require('dotenv').config();

const con = process.env.MONGODB_CON;
mongoose
  .connect(con)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error('Failed to connect DB', err));

const songSchema = mongoose.Schema({
  singer: {
    type: String,
    required: true,
    //  loweecase: true,
    // uppercase: true,
    // trim:true
  },
  song: { type: String, required: true },
  year: {
    type: Number,
    required: function () {
      return this.isReleased;
    },
    min: 1800,
    max: 2023,
    get: (v) => Math.round(v), //called while reading
    set: (v) => Math.round(v), //called while writing
  },
  genre: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        return new Promise((resolve, reject) => {
          resolve(v && v.length > 0);
          reject('something went wrong');
        });
      },
      message: 'should be listed in genre',
    },
  },
  isReleased: { type: Boolean, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Songs = mongoose.model('Songs', songSchema);
// async function createSongs() {
//   const s = new Songs({
//     singer: 'Bon Jovi',
//     year: 1991.1111,
//     song: 'Livin on prayer',
//     genre: ['pop', 'rock'],
//     isReleased: true,
//   });
//   try {
//     const res = await s.save();
//     console.log(res);
//   } catch (err) {
//     for (f in err.errors) {
//       console.log(err.errors[f].message);
//     }
//   }
// }
// createSongs();

async function getSong(id) {
  const s = await Songs.find({ _id: id })
    .sort({ year: 1 })
    .limit(3)
    .select(['singer', 'song', 'year', 'genre']);
  console.log(s);
}
getSong('62c59509ccc7ee8274d13bb0');
