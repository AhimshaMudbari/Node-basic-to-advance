const mongoose = require('mongoose');
require('dotenv').config();

const con = process.env.MONGO;

mongoose
  .connect(con)
  .then(() => {
    console.log('db connected successful');
  })
  .catch((err) => console.error('not connected\n', err));

const Author = mongoose.model(
  'Author',
  mongoose.Schema({
    name: String,
    bio: String,
    website: String,
  })
);
const Course = mongoose.model(
  'Courses',
  mongoose.Schema({
    name: String,
    author: {
      type: mongoose.Schema.Types.ObjectId, //setting object id for relation
      ref: 'Author', //targert collection is author
    },
  })
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });
  const result = await author.save();
  console.log(author);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });
  const r = await course.save();
  console.log(r);
}

async function showAuthor() {
  const result = await Author.find().sort({ name: 1 });
  console.log(result);
}

async function showCourse() {
  const result = await Course.find()
    .populate('author', 'name bio -_id') //comming from objectId
    .sort({ name: 1 });
  console.log(result);
}

// createAuthor('Ahim mudbari', 'I am a MERN developer', 'ahimsha.click');
// createCourse('React course', '62c7e61873a0a84ff2648d70');

showCourse();
