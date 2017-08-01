const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const { Student } = require('./Student');

const periodSchema = new Schema({
  number: Number,
  students: [{ type: ObjectId, ref: 'Student' }],
});

periodSchema.pre('remove', function callback(next) {
  const Course = mongoose.model('course');
  Course.update(
    {
      periods: {
        $in: [this._id],
      },
    },
    {
      $pull: {
        periods: this._id,
      },
    },
    {
      multi: true,
    }
  ).then(() => next());
});

const Period = mongoose.model('period', periodSchema);
module.exports = Period;
