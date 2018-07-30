var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

UserSchema.pre("save", function(next) {
  var user = this;

  if (!this.isModified("password")) {
    return next();
  }

  return bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }

    return bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      return next();
    });
  });
});

// 비밀번호 비교
UserSchema.methods.comparePassword = function(pwd, cb) {
  bcrypt.compare(pwd, this.password, function(err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
