const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const Promise = require("bluebird");
const methodOverride = require("method-override");
//set up express
const app = express();
const routes = require("./routes/api");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use("/api", routes);

//connect to mongodb
let mongodburl = "mongodb://mongo:27017/items";
//let mongodburl = "mongodb://localhost:27017";
//let mongodburl = "mongodb://mongo:27017";
mongoose.connect(mongodburl);
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

// view engine setup
app.set("views", "views");
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.json());

//error handling
app.use(function(err, req, res, next) {
  //console.log(err);
  res.status(422).send({ error: err.message });
});

app.listen(process.env.port || 8000, function() {
  console.log("listening");
});
