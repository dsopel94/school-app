const AuthenticationController = require('../controllers/authentication.controller');
const express = require('express');
const passportService = require('../config/passport');
const passport = require('passport');
//const CourseController = require('../controllers/course.controller.js')
const app = express();

const requireAuth = passport.authenticate('jwt', {
  session: false,
  failureFlash: true,
});
const requireLogin = passport.authenticate('local', {
  session: false,
  failureFlash: 'Incorrect username or password!',
});

module.exports = function(app) {
  // Initializing route groups
  const apiRoutes = express.Router(), authRoutes = express.Router();

  //=========================
  // Auth Routes
  //=========================

  // Set auth routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/auth', authRoutes);

  // Registration route
  authRoutes.post('/register', AuthenticationController.register);

  // Login route
  authRoutes.post('/login', requireLogin, AuthenticationController.login);

  authRoutes.post('/dashboard');

  //authRoutes.post('/dashboard')

  // Set url for API group routes
  app.use('/api', apiRoutes);
};
