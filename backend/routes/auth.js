var express = require("express");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var passport = require("passport");
require("../config/passport")(passport);

var config = require("../config/config.js");
var User = require("../models/Users.js");

var router = express.Router();

// 회원가입
router.post("/register", function(req, res) {
  if (
    !req.body.username ||
    !req.body.password ||
    !req.body.email ||
    !req.body.name
  ) {
    return res
      .status(601)
      .send({ success: false, msg: "Please pass username and password." });
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      name: req.body.name
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res
          .status(600)
          .send({ success: false, msg: "Username already exists." });
      }
      return res.json({ success: true, msg: "Successful created new user." });
    });
  }
});

// 로그인
router.post("/login", function(req, res) {
  User.findOne(
    {
      username: req.body.username
    },
    function(err, user) {
      if (err) throw err;

      if (!user) {
        res.status(401).send({
          success: false,
          msg: "User not found."
        });
      } else {
        // 패스워드가 맞는지 체크
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            // 맞다면 토큰 생성
            var token = jwt.sign(user.toJSON(), config.secret);
            // 토큰 리턴
            res.json({ success: true, token: "JWT " + token });
          } else {
            res.status(401).send({
              success: false,
              msg: "Wrong password."
            });
          }
        });
      }
    }
  );
});

module.exports = router;
