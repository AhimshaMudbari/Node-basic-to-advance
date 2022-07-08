const mongoose = require('mongoose');
require('dotenv').config();

const con = process.env.MONGOO;

mongoose
  .connect(con)
  .then(() => {
    console.log('db connected successful');
  })
  .catch((err) => console.error('not connected\n', err));

const authorSchema = mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model('AuthorDenormalization', authorSchema);

const Course = mongoose.model(
  'CoursesDenormalization',
  new mongoose.Schema({
    name: String,
    author: authorSchema, //can use validation by making it object
  })
);

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });
  const r = await course.save();
  console.log(r);
}

async function updateAuthor(id) {
  //   let course = await Course.findById(id);
  const course = await Course.updateOne(
    { _id: id },
    {
      //   $set: {
      //     'author.name': 'Arzoo khadka',
      //   },
      $unset: {
        author: '', //to unset property or remove the schema of author
      },
    }
  );
  //   course.author.name = 'Ahim don';
  //   course.save(); //cannot use course.author.save()
  console.log(course);
}
async function showCourse() {
  const result = await Course.find().sort({ name: 1 });
  console.log(result);
}

// createCourse('mongo course', new Author({ name: 'Ahimsha mudbari' }));
updateAuthor('62c842013aea255ab49e9c6b');
