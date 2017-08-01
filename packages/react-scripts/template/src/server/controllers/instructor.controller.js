const path = require('path');
const Instructor = require('../models/instructor');
const cuid = require('cuid');
const sanitizeHtml = require('sanitize-html');
/**
 * Get all Instructors
 * @param req
 * @param res
 * @returns void
 */
exports.getInstructors = function(req, res) {
  console.log('!');
  Instructor.find().exec().then(instructors => {
    let correctPath = __dirname;
    correctPath = correctPath.replace('packages/', '');
    console.log(correctPath, path.dirName, path.baseName);
    // res.sendFile('index.html', {
    //   root: '../../projects/create-react-app/packages/react-scripts/template/public',
    // });
    res.json({
      instructors: instructors.map(instructor => instructor.apiRepr()),
    });
    // res.send('message');
  });
};
exports.addInstructor = function(req, res) {
  const newInstructor = new Instructor({
    username: sanitizeHtml(req.body.username),
    fullName: sanitizeHtml(req.body.fullName),
    password: sanitizeHtml(req.body.password),
  });
  newInstructor.save();
  res.status(201).json(newInstructor);
  // .then(function() {
  //   console.log("Hit this function")
  //   res.json(newInstructor)
  // }, function(err) {
  //   console.log("Hit the error function")
  //   res.status(500).send(err);
  //   // want to handle errors here
  // });
  // Let's sanitize inputs
  //if (err) {
  //res.json({ newInstructor: 'saved' });
};
//https://www.w3schools.com/jsref/jsref_obj_date.asp
/**
 * Get a single post
 * @param req
 //}
 * @param res
 * @returns void
 */
exports.getInstructor = function(req, res) {
  Instructor.findOne({ cuid: req.params.cuid }).exec((err, instructor) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ instructor });
  });
  return res.json({ message: 'got Instructor' });
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
exports.deleteInstructor = function(req, res) {
  Instructor.findOne({ cuid: req.params.cuid }).exec((err, instructor) => {
    if (err) {
      res.status(500).send(err);
    }
    instructor.remove(() => {
      res.status(200).end();
    });
  });
  return res.status(200).end();
};
