//const Cookies = require('universal-cookie');
const Period = require('../models/Period');
const cuid = require('cuid');
const sanitizeHtml = require('sanitize-html');
const ObjectId = require('mongodb').ObjectID;
//const cookies = new Cookies();

function setPeriodInfo(request) {
  return {
    number: request.number,
    students: request._students,
  };
}
/**
 * Get all Courses
 * @param req
 * @param res
 * @returns void
 */
exports.getPeriods = function(req, res) {
  Period.find().exec((err, periods) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ periods });
  });
};

exports.getAllPeriods = function(req, res) {
  Period.find().exec((err, periods) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ periods });
  });
};
exports.addPeriod = function(req, res, next) {
  console.log(req.body);
  if (!req.body.number) {
    res.status(403).end();
  }
  let newPeriod = new Period({
    number: req.body.number,
    students: req.body.students,
  });
  console.log(newPeriod.students);
  // Let's sanitize input
  newPeriod.cuid = cuid();
  newPeriod.number = sanitizeHtml(newPeriod.number);
  newPeriod.students = sanitizeHtml(newPeriod.students);
  newPeriod.save(function(err, period) {
    if (err) {
      return next(err);
    }
    let periodInfo = setPeriodInfo(newPeriod);
    res.status(201).send(periodInfo);
  });
};

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */

exports.getPeriod = function(req, res) {
  console.log(res.data, "Let's try this");
  Period.findOne({ _id: req.params.cuid }).exec((err, period) => {
    console.log(res, 'Is this doing anything?');
    if (err) {
      res.status(500).send('This is not working');
    }
    res.status(200).json({ period });
  });
};

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
exports.deletePeriod = function(req, res) {
  Period.findOne({ _id: req.params.cuid }).exec((err, period) => {
    if (err) {
      res.status(500).send(err);
    }
    period.remove(() => {
      res.status(200).end();
    });
  });
  return res.status(200).end();
};

exports.editPeriod = function(req, res) {
  Period.findByIdAndUpdate(
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
