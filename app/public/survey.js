//document ready
$(document).ready(function() {
    
    showPhoto(); 

    //set global variables    
    var scoreArray = [],
        userName,
        userPhoto,
        answers = {
            answer1 : 0,
            answer2 : 0,
            answer3 : 0,
            answer4 : 0,
            answer5 : 0,
            answer6 : 0,
            answer7 : 0,
            answer8 : 0,
            answer9 : 0,
            answer10 : 0
        };

    // //on click value capture for survey 
    $("li").on("click", function(){
        for(var i = 1 ; i < 11 ; i++){
            if ($(this).parent().attr("id") == "quest"+i){
                answers['answer' + i] = $(this).val()             
            }
        }    
    }); 

    //function to show photo
    function showPhoto(){    
            console.log("click")
            var userPhoto = sessionStorage.getItem("userPhoto");
            var userName = sessionStorage.getItem("userName");
            console.log(userPhoto);
            console.log(userName);
            $("#pictureDiv").attr("src", userPhoto);
            var welcome = $("<h3>").html("Welcome " + userName);
            $("#userDiv").append(welcome);
    };

    //home page submit button
    $("#submitAnswers").on("click", function() {
        var userName = sessionStorage.getItem('userName');
        var userPhoto = sessionStorage.getItem("userPhoto");
        for ( var i = 1 ; i < 11 ; i++){
            scoreArray.push(answers["answer"+ i])
        }  
        showPhoto();         
        var animalObject = {
            "name": userName,
            "photo": userPhoto,
            "scores": scoreArray
        };

        //post to apiRoute.js		
        $.post("/api/friends", animalObject, function() {

            scoreArray = [];
            answers = { 
                answer1 : 0,
                answer2 : 0,
                answer3 : 0,
                answer4 : 0,
                answer5 : 0,
                answer6 : 0,
                answer7 : 0,
                answer8 : 0,
                answer9 : 0,
                answer10 : 0
            };

            //get back matched spirit animal	
        }).then(function(match) {

            var parsed = JSON.parse(match)

            $('.modal-body').empty();
            $('.modal').modal('show');

            var closeName = parsed.name;
            var closePhoto = parsed.photo;

            var nameDiv = $('<h3>');
            var photoDiv = $('<img id="animalImg">');

            nameDiv.text(closeName);
            photoDiv.attr('src', closePhoto);

            $('.modal-body').append(nameDiv);
            $('.modal-body').append(photoDiv);
        });
    });

    //back to home button
    $("#backToHome").on("click", function() {
        $("#userName").val('');
        $("#userPhoto").val('');
    });
});
        