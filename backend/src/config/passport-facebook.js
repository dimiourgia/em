const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user.model');
require('dotenv').config();

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'emails', 'name'] // Specify the profile fields you want from Facebook
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log('Facebook Profile:', profile);
    try {
      let user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        return done(null, user);
      }

      user = await User.create({
        firstName: profile.name?.givenName || 'N/A',
        lastName: profile.name?.familyName || 'N/A',
        email: profile.emails?.[0]?.value || 'N/A',
        facebookId: profile.id
      });

      return done(null, user);
    } catch (err) {
      console.error('FacebookStrategy error:', err);
      return done(err, false);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
