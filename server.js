//require express and body-parser
var express = require("express");
var bodyParser = require('body-parser');

//set app and port variables
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"}));
app.use("/public", express.static("./app/public"))

//requiring htmlRouts and apiRoutes
require('./app/routing/htmlRoutes.js')(app);
require('./app/routing/apiRoutes.js')(app);

//listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});