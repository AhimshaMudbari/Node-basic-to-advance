const mongoose = require('mongoose');
require('dotenv').config();
const mongo_connection = process.env.MONGODB_CONNECT_MOVIES;
mongoose
  .connect(mongo_connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database successfully connected');
  })
  .catch((err) => console.error(err, 'Database connection failed'));

const movieSchema = mongoose.Schema({
  movie: String,
  releasedYear: Number,
  actors: [String],
  date: { type: Date, default: Date.now },
});

const Movies = mongoose.model('Movies', movieSchema);
// async function movieList() {
//   const m = new Movies({
//     movie: 'Fantastic beast',
//     releasedYear: 2022,
//     actors: ['Jared Leto', 'matt smith', 'Adria Arjona'],
//   });
//   const result = await m.save();
//   console.log(result);
// }
// movieList();

// const Movies = mongoose.model('Movies', movieSchema);
// async function getMovies() {
//   return await Movies.find({
//     movie: /.*.*/i,
//     releasedYear: { $gte: 2009, $lte: 2022 },
//   })
//     // .sort({ movie: -1 })
//     .sort('-releasedYear')
//     .limit(5)
//     .select({ movie: 1, releasedYear: 1 });
// }
// async function getting() {
//   const m = await getMovies();
//   console.log(m);
// }
// getting();

// async function updateMovie(id) {
//Two approaches for update 1. Query first --->findById()--modify its properties--save()
//2. update first---> update directly -- optionally get the updated content

// const m = await Movies.findById(id); //query first approach
// if (!m) return;
// m.set({
//   movie: 'Alladin',
//   releasedYear: 1997,
//   actors: ['Aladdin', 'Jasmin', 'Genie'],
// });

//   const movie = await Movies.findByIdAndUpdate(
//     id,
//     {
//       $set: {
//         movie: 'Thr33 Idiots',
//       },
//     },
//     { new: true }
//   );

//   console.log(movie);
// }
// updateMovie('62c4207222e37629d77bbc95');

async function removeMovie(id) {
  //  const result= await  Movies.deleteOne({_id:id})
  //   console.log(result);

  const m = await Movies.findByIdAndDelete(id);
  console.log(m);
}
removeMovie('62c4207222e37629d77bbc95');
