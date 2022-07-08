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
  'ArrayCoursesDenormalization',
  new mongoose.Schema({
    name: String,
    authors: [authorSchema], //can use validation by making it object
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
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
        authors: '', //to unset property or remove the schema of author
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
async function addAuthorObj(id, author) {
  const course = await Course.findById(id);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(id, authorid) {
  const course = await Course.findById(id);
  const author = await course.authors.id(authorid); //id() is used to look child id
  author.remove();
  course.save();
}
// createCourse('mongo course', [
//   new Author({ name: 'Ahimsha mudbari' }),
//   new Author({ name: 'Rajesh Hamal mudbari' }),
// ]);

// updateAuthor('62c842013aea255ab49e9c6b');

// addAuthorObj('62c852577ea247809486bd50', new Author({ name: 'Anmol kc' }));

removeAuthor('62c852577ea247809486bd50', '62c852577ea247809486bd4f');
