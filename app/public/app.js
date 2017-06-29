$(document).ready(function(){
	
	var a1 = 0, a2 =0,a3 = 0, a4 = 0, a5 = 0, a6 = 0, a7 = 0, a8 = 0, a9 = 0, a10 = 0;
	var scoreArray = [];
	var closest = 30;
	var userName;

	$("#quest1 li").on("click", function(){
		a1 = $(this).val();				
	});
	$("#quest2 li").on("click", function(){
		a2 = $(this).val();				
	});
	$("#quest3 li").on("click", function(){
		a3 = $(this).val();				
	});
	$("#quest4 li").on("click", function(){
		a4 = $(this).val();				
	});
	$("#quest5 li").on("click", function(){
		a5 = $(this).val();				
	});
	$("#quest6 li").on("click", function(){
		a6 = $(this).val();				
	});
	$("#quest7 li").on("click", function(){
		a7 = $(this).val();				
	});
	$("#quest8 li").on("click", function(){
		a8 = $(this).val();				
	});
	$("#quest9 li").on("click", function(){
		a9 = $(this).val();				
	});
	$("#quest10 li").on("click", function(){
		a10 = $(this).val();				
	});
	
	

	$("#submitAnswers").on("click", function(){

		var scoreArray = [a1,a2,a3,a4,a5,a6,a7,a8,a9,a10];
		var userName = $("#userName").val().trim();
		var userPhoto = $("#userPhoto").val().trim();
		var animalObject = {
			"name": userName,
			"photo": userPhoto,
			"scores": scoreArray
		};
		

		$.post("/api/friends", animalObject, function(){
			$("#userName").val('');
			$("#userPhoto").val('');	
		});

		matchUp(scoreArray);

	});

	function matchUp(scoreArray){
		var sumArray = [];
		var sum = 0; 
		var closestNumber= 0;
		var currentURL = window.location.origin;

		$.ajax(
		{
			url: currentURL + '/api/friends',
			method: 'GET'
		})
		.done(function(friends) {
			
			for(var i = 0; i < friends.length -1; i++){
				
				for(var j = 0; j < scoreArray.length; j++) {
					sum += (Math.abs(scoreArray[j] - friends[i].scores[j]));								
				}
				
				sumArray.push(sum);
				sum = 0; 
				a1 = 0, a2 =0,a3 = 0, a4 = 0, a5 = 0, a6 = 0, a7 = 0, a8 = 0, a9 = 0, a10 = 0;
				
			}
			
			for (var i = 0 ; i< sumArray.length;i++){

				if(sumArray[i] < closest){
					closest = sumArray[i];
					closestNumber = i;						
				}
			}
		
			fireModal(friends, closestNumber);
		});		
	}

	function fireModal(friends,closestNumber){
		
		$('.modal-body').empty();
		$('.modal').modal('show');

		var closeName = friends[closestNumber].name;
		var closePhoto = friends[closestNumber].photo;
		var nameDiv = $('<h3>');
		var photoDiv = $('<img id="animalImg">');
		console.log(closeName)
		nameDiv.text(closeName);
		photoDiv.attr('src', closePhoto);

		$('.modal-body').append(nameDiv);
		$('.modal-body').append(photoDiv);
	}
});