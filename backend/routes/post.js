var express = require("express");
var router = express.Router();
var Post = require("../models/Post.js");

// 게시글 리스트 가져오기
router.get("/", function(req, res, next) {
  Post.find(function(err, list) {
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
router.post("/", function(req, res, next) {
  Post.create(req.body, function(err, post) {
    if (err) return next(err);
    res.json(post);
  });
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
