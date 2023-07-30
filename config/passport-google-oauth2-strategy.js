const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const { User } = require('../models/user');
const crypto = require('crypto');
require('dotenv').config();

// USING PASSPORT GOOGLE OAUTH-2.0
passport.use(new GoogleStrategy({
    clientID: '914621149159-tdvg1ieiaumrg1be5us865qfa4ooenl4.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:27017/auth/google/callback',
    passReqToCallback: true
  },
  function (req, accessToken, refreshToken, profile, done) {
    // return done(null, profile);
    console.log(profile.displayName);
    User.findOne({ username: profile.emails[0].value }).exec(function (err, user) {
      if (err) {
        console.log('error in google strategy passport', err);
        return;
      }

      if (user) {
        return done(null, profile);
      } else {
        User.create({
          displayName: profile.displayName,
          username: profile.emails[0].value,
          password: crypto.randomBytes(20).toString('hex')
        }, function (err, user) {
          if (err) {
            console.log('error in creating user google strategy passport', err);
            return;
          }
          return done(null, profile);
        });
      }
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});
