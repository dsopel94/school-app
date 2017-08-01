const CourseController = require('../controllers/course.controller');
const express = require('express');
const router = new express.Router();

// Get all Posts
router.route('/courses').get(CourseController.getCourses);

// Get one post by cuid
router.route('/courses/:cuid').get(CourseController.getCourse);

// Add a new Post
router.route('/courses/').post(CourseController.addCourse);

// Delete a post by cuid
router.route('/courses/:cuid').delete(CourseController.deleteCourse);

router.route('/dashboard').get(CourseController.getAllCourses);

router.route('/courses/:cuid').put(CourseController.editCourse);

module.exports = router;
// just so that you have this file as a template
