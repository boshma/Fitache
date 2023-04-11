const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const { FitnessJournal } = require('../models/FitnessJournal'); // Update this line
const config = require('../config');
const User = require('../models/User');


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const localOptions = {
  usernameField: 'email',
};

// JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
  console.log('Decoded JWT payload:', payload);
  
  try {
    const user = await User.findById(payload.id); // Find user directly by their ID

    if (!user) {
      return done(null, false);
    }

    console.log('Authenticated user:', user);

    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});




// Local Strategy
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  try {
    const user = await mongoose.model('User').findOne({ email }); // Update this line

    if (!user) {
      return done(null, false);
    }

    // Compare passwords
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }
      if (!isMatch) {
        return done(null, false);
      }
      return done(null, user);
    });
  } catch (err) {
    return done(err);
  }
});

module.exports = (passport) => {
  passport.use(jwtLogin);
  passport.use(localLogin);
};
