var express = require("express");
var Post = require("../models/Post.js");
var passport = require("passport");
require("../config/passport.js")(passport);

var router = express.Router();

// 토큰 가져오는 부분
function getToken(headers) {
  var splited = headers.authorization.split(" ");
  if (splited.length == 2) {
    // JWT 글자 다음을 리턴, splited[0] == JWT
    return splited[1];
  } else {
    return null;
  }
}

// 게시글 리스트 가져오기
router.get("/", function(req, res, next) {
  Post.find()
    // 내림차순 정렬 (최신글이 위로 올라오게끔)
    .sort({ write_date: -1 })
    .exec(function(err, list) {
      if (err) return next(err);
      res.json(list);
    });
});

// 게시글 페이징 가져오기 (한페이지에 5개씩)
router.get("/pages/:id", function(req, res, next) {
  Post.find()
    // 내림차순 정렬 (최신글이 위로 올라오게끔)
    .sort({ write_date: -1 })
    .skip((req.params.id - 1) * 5)
    .limit(5)
    .exec(function(err, list) {
      if (err) return next(err);
      res.json(list);
    });
});

// 페이지 전체 개수 가져오기
router.get("/pages", function(req, res, next) {
  Post.find()
    .countDocuments()
    .exec(function(err, list) {
      if (err) return next(err);
      res.json(list);
    });
});

// 개별 게시글 가져오기
router.get("/:id", function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// 게시글 저장
router.post("/", passport.authenticate("jwt", { session: false }), function(
  req,
  res,
  next
) {
  //console.log(req.headers);
  var token = getToken(req.headers);
  if (token) {
    Post.create(req.body, function(err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({ success: false, msg: "Unauthorized." });
  }
});

// 게시글 수정
router.put("/:id", function(req, res, next) {
  Post.findByIdAndUpdate(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

// 게시글 삭제
router.delete("/:id", function(req, res, next) {
  Post.findByIdAndRemove(req.params.id, req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
