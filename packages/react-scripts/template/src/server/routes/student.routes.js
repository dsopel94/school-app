const StudentController = require('../controllers/student.controller');
const express = require('express');
const router = new express.Router();

// Get all students
router.route('/students').get(StudentController.getStudents);

// Get one post by cuid
router.route('/students/:cuid').get(StudentController.getStudent);

// Add a new Post
router.route('/students/').post(StudentController.addStudent);

// Delete a post by cuid
router.route('/students/:cuid').delete(StudentController.deleteStudent);

router.route('/students/:cuid').put(StudentController.editStudent);

module.exports = router;
// just so that you have this file as a template
