var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

var app = express();

var routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(routes);

// If deployed, use the deployed db or use the local mongo db
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://admin:abc123@ds133187.mlab.com:33187/heroku_glq5nb4r";
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true
});

app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});
