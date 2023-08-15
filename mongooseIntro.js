const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/artists');

// const artistSchema = new mongoose.Schema({
//   name: String,
//   country: String,
//   birthday: Date,
//   careerStartYear: Number,
//   email: String,
//   isMale: Boolean,
// });

// const artistSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     minLength: 1,
//     maxLength: 64,
//     trim: true,
//     required: true,
//   },
//   country: {
//     type: String,
//     minLength: 2,
//     maxLength: 64,
//     default: 'Ukraine',
//   },
//   birthday: {
//     type: Date,
//     max: new Date(),
//     required: true,
//   },
//   careerStartYear: {
//     type: Number,
//     max: new Date().getFullYear(),
//   },
//   email: {
//     type: String,
//   },
//   isMale: {
//     type: Boolean,
//   },
// });

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 1,
    maxLength: 64,
    trim: true,
    required: true,
  },
  country: {
    type: String,
    minLength: 2,
    maxLength: 64,
    default: 'Ukraine',
  },
  birthday: {
    type: Date,
    max: new Date(),
    required: true,
  },
  careerStartYear: {
    type: Number,
    validate: {
      validator: function (v) {
        return v >= this.birthday.getFullYear();
      },
    },
    max: [new Date().getFullYear(), 'Birthday cannot be later than today'],
  },
  email: {
    type: String,
  },
  isMale: {
    type: Boolean,
  },
});

const Atrist = mongoose.model('Artist', artistSchema);
