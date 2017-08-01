const Instructor = require('mongoose').model('Instructor');
const jwt = require('jsonwebtoken');
const LocalStrategy = require('passport-local').Strategy;
const config = require('../config/main');

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
  },
  (req, username, password, done) => {
    const instructorData = {
      username: username.trim(),
      password: password.trim(),
    };

    // find a user by email address
    return Instructor.findOne(
      { username: userData.username },
      (err, instructor) => {
        if (err) {
          return done(err);
        }

        if (!instructor) {
          const error = new Error('Incorrect username or password');
          error.name = 'IncorrectCredentialsError';

          return done(error);
        }

        // check if a hashed user's password is equal to a value saved in the database
        return instructor.comparePassword(
          instructorData.password,
          (passwordErr, isMatch) => {
            if (err) {
              return done(err);
            }

            if (!isMatch) {
              const error = new Error('Incorrect username or password');
              error.name = 'IncorrectCredentialsError';

              return done(error);
            }

            const payload = {
              sub: instructor._id,
            };

            // create a token string
            const token = jwt.sign(payload, config.jwtSecret);
            const data = {
              username: instructor.username,
            };

            return done(null, token, data);
          }
        );
      }
    );
  }
);
