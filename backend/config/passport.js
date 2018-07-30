var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var User = require("../models/Users.js");
var config = require("./config.js");

module.exports = function(passport) {
  // jwt options
  var options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: config.secret
  };

  passport.use(
    new JwtStrategy(options, function(payload, done) {
      User.findOne({ _id: payload._id }, function(err, user) {
        if (err) {
          console.log("error: " + err);
          return done(err, false);
        }
        if (user) {
          console.log("user: " + user);
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    })
  );
};
