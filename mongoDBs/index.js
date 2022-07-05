const mongoose = require('mongoose');
require('dotenv').config();
const mongo_connection = process.env.MONGODB_CONNECT;
mongoose
  .connect(mongo_connection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected to db'))
  .catch((err) => {
    console.error('could not connect to mongoDB', err);
  });

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model('Course', courseSchema);
// async function createCourse() {
//   const course = new Course({
//     name: 'Java course',
//     author: 'Ahimsha Mudbari',
//     tags: ['basic', 'advance'],
//     isPublished: true,
//   });

//   const result = await course.save();
//   console.log(result);
// }
// createCourse();

// async function getCourses() {
//   //comparision operators in mongoDB/mongoose
//   //eq-equal, ne-not equal, gt-greater than, lt-less than
//   //gte-greater than or equal to, lte- less than or equal to
//   //in, nin-not in

//   const courses = await Course
//     // .find({ price: { $gt: 10, $lt: 20 } }) //greater than 10 and less than 20
//     // .find({price:{$in:[10,20,30]}}) //either 10 or 20 or 30
//     .find({ author: 'Ahimsha Mudbari', isPublished: false })
//     .limit(5)
//     .sort({ name: -1 }) //1 indicates asceending order, -1 indicates descending order
//     .select({ name: 1, tags: 1 });
//   console.log(courses);
// }
// getCourses();

// async function getCourse() {
//   //logical operator----> or, and
//   const courses = await Course.find()
//     // .or([{ author: 'Ahimsha Mudari' }, { isPublished: false }]) //work like or operator
//     .and([{ isPublished: true }, { author: 'Ahimsha Mudbari' }]) //work like and operator
//     .limit(5)
//     .sort({ date: 1 })
//     .select({ name: 1, tags: 1, date: 1, isPublished: 1 });
//   console.log(courses);
// }
// getCourse();

// async function getDatas() {
//   //regular expression
//   //^-->starts with, /mudbari$/-->$ indicates ends with
//   const courses = await Course
//     //.find({ author: 'Ahimsha Mudbari', isPublished: false })
//     // .find({ author: /^Ahim/i }) //regular expression syntax -->adding i at end makes case in sensetive
//     .find({ author: /.*Ahimsha.*/i }) //Ahimsha can be anywhere middle, at end, or begining
//     .sort({ date: 1 }) //1 ascending ,-1 descending
//     .limit(7)
//     // .select({ name: 1, tags: 1 })
//     .count(); // to get number of datas
//   console.log(courses);
// }
// getDatas();

async function myFun() {
  //pagination...
  const pgno = 1;
  const pgsize = 5;
  const c = await Course.find({ name: /.*Ahimsha.*/i })
    .skip((pgno - 1) * pgsize)
    .limit(pgsize)
    .select({ name: 1, date: 1 });
  console.log(c);
}
myFun();
