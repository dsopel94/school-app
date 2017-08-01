const PeriodController = require('../controllers/period.controller');
const express = require('express');
const router = new express.Router();

// Get all periods
router.route('/periods').get(PeriodController.getPeriods);

// Get one post by cuid
router.route('/periods/:cuid').get(PeriodController.getPeriod);

// Add a new Post
router.route('/periods').post(PeriodController.addPeriod);

// Delete a post by cuid
router.route('/periods/:cuid').delete(PeriodController.deletePeriod);

router.route('/periods/:cuid').put(PeriodController.editPeriod);

module.exports = router;
// just so that you have this file as a template
