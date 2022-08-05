const mongoose = require('mongoose');
require('dotenv').config();

const con = process.env.MONGOO;
mongoose
  .connect(con)
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => {
    console.error('not connected', err);
  });

const subjectSchema = new mongoose.Schema({
  name: String,
  medium: String,
  hasProgramming: Boolean,
  practical: {
    type: Boolean,
    required: function () {
      return this.hasProgramming;
    },
  },
});

const Subject = mongoose.model('Subject', subjectSchema);

const Student = mongoose.model(
  'Student',
  new mongoose.Schema({
    stdName: {
      type: String,
      required: true,
    },
    subject: subjectSchema,
  })
);

async function creatingSubject() {
  const s = new Subject({
    name: 'Node JS',
    medium: 'English',
    hasProgramming: true,
    practical: true,
  });
  try {
    const r = await s.save();
    console.log(r);
  } catch (err) {
    console.log(err.message);
  }
}
// creatingSubject();

async function createStudent(subject) {
  const std = new Student({
    stdName: 'Ahimsha mudbari',
    subject,
  });
  const result = await std.save();
  console.log(result);
}
// createStudent(
//   new Subject({
//     name: 'Python',
//     medium: 'python',
//   })
// );

async function getStudent() {
  const s = await Student.find();
  console.log(s);
}
// getStudent();

async function updateStudent(id) {
  let s = await Student.updateOne(
    { _id: id },
    {
      $unset: {
        subject: '',
      },
      new: true,
    }
  );
  console.log(s);
}
updateStudent('62ecbb11ab38bc624d8909f8'); //student id not subject id
