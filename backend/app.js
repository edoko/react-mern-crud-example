var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var passport = require("passport");
require("./config/passport.js")(passport);

var post = require("./routes/post");
var auth = require("./routes/auth");
var app = express();

var mongoose = require("mongoose");

var cors = require("cors");

// 포트는 3001번
var PORT = 3001;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(express.static(path.join(__dirname, "../build")));

// CORS
app.use(cors());

// DB 연결
//mongoose.Promise = require("bluebird");
mongoose
  .connect(
    "mongodb://localhost:27017/mern-crud",
    { useNewUrlParser: true, promiseLibrary: require("bluebird") }
  )
  .then(() => console.log("Successfully Connect!"))
  .catch(err => console.error(err));

app.use("/api/post", post);
app.use("/api/auth", auth);

app.get("/", (req, res) => {
  return res.end("Successfully Working API Server!");
});

// 404 에러
app.use(function(req, res, next) {
  var err = new Error("404 Not Found");
  err.status = 404;
  next(err);
});

// 포트 활성화!
app.listen(PORT);

module.exports = app;
