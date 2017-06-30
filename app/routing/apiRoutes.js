var friends = require('../data/friends');	

module.exports = function(app) {

	app.get('/api/friends', function(req, res) {
		res.json(friends);	
	});

	app.post('/api/friends', function(req, res) {
		var closest = 30;
		var userName = req.body.name;
		var userPhoto = req.body.photo;
		var scoreArray = req.body.scores;
		matchUp();

		function matchUp(){
			var sumArray = [];
			var sum = 0; 
			var closestNumber= 0;
		
				for(var i = 0; i < friends.length; i++){
					
					for(var j = 0; j < scoreArray.length; j++) {
						sum += (Math.abs(scoreArray[j] - friends[i].scores[j]));								
					}
					
					sumArray.push(sum);
					sum = 0; 				
				}
				for (var i = 0 ; i< sumArray.length;i++){

					if(sumArray[i] < closest){
						closest = sumArray[i];
						closestNumber = i;						
					}
				}
				var match = friends[closestNumber]
				
				friends.push(req.body);
				
				var string = JSON.stringify(match)
				res.end(string);
		};		
	});
}
