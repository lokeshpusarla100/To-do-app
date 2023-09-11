require('dotenv').config();
const passport = require('passport');
const  JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const UserModel = require('../models/register')

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secret_key;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    UserModel.findOne({_id:jwt_payload.id})
    .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          console.log('User Not Found');
          return done(null, false);
        }
      })
      .catch((err) => {
        console.error('Error finding user:', err);
        return done(err, false);
      });
}));

module.exports = passport;