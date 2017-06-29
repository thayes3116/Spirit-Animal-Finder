$(document).ready(function(){
	
	var a1 = 0, a2 =0,a3 = 0, a4 = 0, a5 = 0, a6 = 0, a7 = 0, a8 = 0, a9 = 0, a10 = 0;
	var scoreArray = [];
	
	

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

			a1 = 0, a2 =0, a3 = 0, a4 = 0, a5 = 0, a6 = 0, a7 = 0, a8 = 0, a9 = 0, a10 = 0;	

		}).then(function(match){

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
});
	