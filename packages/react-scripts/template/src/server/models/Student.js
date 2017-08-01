const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Course = require('./Course');
const ObjectId = Schema.Types.ObjectId;

const studentSchema = new Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  courses: { type: ObjectId, ref: 'Course' },
  streetAddress: String,
  miscAddress: String,
});

const Student = mongoose.model('student', studentSchema);
module.exports = Student;
