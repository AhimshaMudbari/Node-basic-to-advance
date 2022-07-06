const mongoose = require('mongoose');
require('dotenv').config();

const con = process.env.MONGODB_CON;
mongoose
  .connect(con)
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error('Failed to connect DB', err));

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 11,
    //  match:/pattern/, //regular expression
    required: true,
  },
  agelimit: {
    type: String,
    enum: ['kid', 'adult', 'old'],
    required: true,
  },
  price: {
    type: Number,
    min: 5,
    max: 100,
    required: function () {
      //built-in validation
      return this.isPublished;
    },
  }, //arrow function won't work
  author: { type: String, required: true },
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: 'A course should have atleast one tag',
    },
  },
  isPublished: { type: Boolean, required: true },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Course = mongoose.model('Course', courseSchema);
//validation...
async function addCourse() {
  const c = new Course({
    name: 'Node Course',
    // price: 20,
    author: 'arzoo',
    agelimit: 'kid',
    // tags: null, //gives error
    tags: ['Basics', 'Advance'],
    isPublished: false,
  });
  try {
    c.validate;
    const r = await c.save();
    console.log(r);
    // const r = await c.save();
    // console.log(r);
  } catch (err) {
    console.log(err.message);
  }
}
addCourse();
