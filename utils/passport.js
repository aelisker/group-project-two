const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');
const bcrypt = require('bcrypt');

// documentation: http://www.passportjs.org/docs/username-password/ and https://dev.to/gm456742/building-a-nodejs-web-app-using-passportjs-for-authentication-3ge2
// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({
//       where: {
//         username: username
//       }
//     })
//     .then(dbUser => {
//       if (!dbUser) {
//         console.log('Incorrect username');
//         return done(null, false, { message: 'Incorrect username.' });
//       } else if (!dbUser.validatePassword(password)) {
//         console.log('Incorrect password');
//         return done(null, false, { message: 'Incorrect password.' });
//       }
//       return done(null, dbUser)
//     })
//   }
// ));

passport.use(new LocalStrategy(
  // Our user will sign in using an email, rather than a "username"
  {
    usernameField: "username"
  },
  function(username, password, done) {
    // When a user tries to sign in this code runs
    User.findOne({
      where: {
        username: username
      }
    }).then(function(dbUser) {

      // If there's no user with the given email
      if (!dbUser) {
        console.log('We make it into failed user test');
        return done(null, false, {
          message: "Incorrect username."
        });
      } else if (!dbUser.validatePassword(password)) {
        console.log('Incorrect password');
        return done(null, false, {
          message: "Incorrect password."
        });
      }
      // If none of the above, return the user
      return done(null, dbUser);
    });
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;