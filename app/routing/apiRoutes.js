//require friends.js file
var friends = require('../data/friends');

//export module
module.exports = function(app) {

    //get 
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });

    //post
    app.post('/api/friends', function(req, res) {
        var closest = 30;
        var userName = req.body.name;
        var userPhoto = req.body.photo;
        var scoreArray = req.body.scores;
        matchUp();

        //function to match user to an animal
        function matchUp() {
            var sumArray = [];
            var sum = 0;
            var closestNumber = 0;

            //individual value checker
            for (var i = 0; i < friends.length; i++) {

                for (var j = 0; j < scoreArray.length; j++) {
                    sum += (Math.abs(scoreArray[j] - friends[i].scores[j]));
                }
                if (sum < closest) {
                    closest = sum;
                    closestNumber = i;
                }
                sum = 0;
            }
           
            
            var match = friends[closestNumber]

            friends.push(req.body);
            
            var string = JSON.stringify(match)

            //send back app.js
            res.end(string);
        };
    });
}