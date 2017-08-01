const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const instructorSchema = new Schema({
  fullName: String,
  username: String,
  password: String,
});

instructorSchema.methods.comparePassword = function comparePassword(
  password,
  cb
) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};
instructorSchema.pre('remove', function callback(next) {
  const Course = mongoose.model('course');
  Course.update(
    { _creator: { $in: [this._id] } },
    { $pull: { instructors: this._id } },
    { multi: true }
  ).then(() => next());
});

instructorSchema.pre('save', function(next) {
  const instructor = this, SALT_FACTOR = 5;

  if (!instructor.isModified('password')) return next();

  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(instructor.password, salt, function(err, hash) {
      // null was inside the paramaters above after salt
      if (err) return next(err);
      instructor.password = hash;
      next();
    });
  });
});

instructorSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    fullName: this.fullName,
    username: this.username,
    password: this.password,
  };
};

instructorSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }

    cb(null, isMatch);
  });
};

const Instructor = mongoose.model('Instructor', instructorSchema);
module.exports = Instructor;
