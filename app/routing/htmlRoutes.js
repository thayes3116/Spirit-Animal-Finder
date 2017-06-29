const path = require('path');

module.exports = function(app) {

	// connects to survey page 
	app.get('/survey',function(req, res) {
		res.sendFile(path.join(__dirname + '/../public/survey.html'));
	});

	// connects to home page
	app.get('/', function(req, res) {
		res.sendFile(path.join(__dirname + '/../public/home.html'));
	});
}