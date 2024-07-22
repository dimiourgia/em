const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const User = require('../models/user.model');
require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: '1049856646665-vs06p9p8ltd8d5gi89q403n9b555i7nf.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:5173/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  console.log('Google Profile:', profile);
  try {
    let user = await User.findOne({ email: profile.emails[0].value });

    if (user) {
      console.log('User found:', user);
      return done(null, user);
    }

    console.log('Creating new user');
    user = await User.create({
      firstName: profile.name?.givenName || 'N/A',
      lastName: profile.name?.familyName || 'N/A',
      email: profile.emails?.[0]?.value || 'N/A',
      googleId: profile.id
    });
    console.log('New user created:', user);


    return done(null, user);
  } catch (err) {
    console.error('GoogleStrategy error:', err);
    return done(err, false);
  }
}
));

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECERET_KEY
}, async (jwtPayload, done) => {
  console.log('JWT Payload:', jwtPayload);
  try {
    const user = await User.findById(jwtPayload.userId);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    console.error('JwtStrategy error:', error);
    return done(error, false);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
