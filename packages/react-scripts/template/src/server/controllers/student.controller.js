const Student = require('../models/Student');
const cuid = require('cuid');
const sanitizeHtml = require('sanitize-html');
const ObjectId = require('mongodb').ObjectID;
//const cookies = new Cookies();

function setStudentInfo(request) {
  return {
    firstName: request.firstName,
    lastName: request.lastName,
    phoneNumber: request.phoneNumber,
    courses: request.courses,
    streetAddress: request.streetAddress,
    miscAddress: request.miscAddress,
  };
}
/**
 * Get all Courses
 * @param req
 * @param res
 * @returns void
 */
exports.getStudents = function(req, res) {
  Student.find().exec((err, students) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ students });
  });
};

exports.getAllStudents = function(req, res) {
  Student.find().exec((err, students) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ students });
  });
};
exports.addStudent = function(req, res, next) {
  console.log(req.body);
  if (!req.body.phoneNumber || !req.body.firstName || !req.body.lastName) {
    res.status(403).end();
  }
  let newStudent = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    courses: req.body.courses,
    streetAddress: req.body.streetAddress,
    miscAddress: req.body.miscAddress,
  });
  // Let's sanitize input
  newStudent.cuid = cuid();
  newStudent.firstName = sanitizeHtml(newStudent.firstName);
  newStudent.lastName = sanitizeHtml(newStudent.lastName);
  newStudent.phoneNumber = sanitizeHtml(newStudent.phoneNumber);
  newStudent.courses - sanitizeHtml(newStudent.courses);
  newStudent.streetAddress = sanitizeHtml(newStudent.streetAddress);
  newStudent.miscAddress = sanitizeHtml(newStudent.miscAddress);
  newStudent.save(function(err, student) {
    if (err) {
      return next(err);
    }
    let StudentInfo = setStudentInfo(newStudent);
    res.status(201).send(StudentInfo);
  });
};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */

exports.getStudent = function(req, res) {
  console.log(res.data, "Let's try this");
  Student.findOne({ _id: req.params.cuid }).exec((err, student) => {
    console.log(res, 'Is this doing anything?');
    if (err) {
      res.status(500).send('This is not working');
    }
    res.status(200).json({ student });
  });
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
exports.deleteStudent = function(req, res) {
  Student.findByIdAndRemove({ _id: req.params.cuid }).exec((err, student) => {
    if (err) {
      res.status(500).send(err);
    }
  });
  return res.status(200).end();
};

exports.editStudent = function(req, res) {
  Student.findByIdAndUpdate(
    req.params.cuid,
    { $set: req.body },
    function(err, result) {
      if (err) {
        console.log(err);
      }
      console.log('RESULT: ' + result);
      res.send('Done');
    }
  );
};
