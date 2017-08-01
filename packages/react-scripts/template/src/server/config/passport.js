const passport = require('passport');
const Instructor = require('../models/instructor');
const config = require('./main');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// const localLogin = new LocalStrategy(function(username, password, done) {
//   Instructor.findOne({ username: username }, function(err, instructor) {
//     if (err) {
//       return done(err);
//     }
//     if (!instructor) {
//       return done(null, false, {
//         error: 'Your login details could not be verified. Please try again.',
//       });
//     }
//
//     Instructor.methods.comparePassword(password, function(err, isMatch) {
//       if (err) {
//         return done(err);
//       }
//       if (!isMatch) {
//         return done(null, false, {
//           error: 'Your login details could not be verified. Please try again.',
//         });
//       }
//
//       return done(null, instructor);
//     });
const localLogin = new LocalStrategy(
  {
    passReqToCallback: true,
  },
  function(req, username, password, done) {
    console.log('This is getting called!');
    Instructor.findOne({ username: username }, function(err, instructor) {
      if (err) {
        return done(err);
      }
      if (!instructor) {
        return done(null, false, {
          error: 'Your login details could not be verified. Please try again.',
        });
      }

      instructor.comparePassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }
        if (!isMatch) {
          return done(null, false, {
            error: 'Your login details could not be verified. Please try again.',
          });
        }
        console.log('Success!');
        return done(null, instructor);
      });
    });
  }
);

const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: config.jwt,
};

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  Instructor.findById(payload._id, function(err, instructor) {
    if (err) {
      return done(err, false);
    }

    if (instructor) {
      done(null, instructor);
    } else {
      done(null, false);
    }
  });
});
passport.use(jwtLogin);
passport.use(localLogin);
