const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');

// documentation: http://www.passportjs.org/docs/username-password/ and https://dev.to/gm456742/building-a-nodejs-web-app-using-passportjs-for-authentication-3ge2
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({
      where: {
        username: username
      }
    })
    .then(dbUser => {
      if (!dbUser) {
        return done(null, false, { message: 'Incorrect username.' });
      } else if (!dbUser.passwordValidation(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, dbUser)
    })
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;