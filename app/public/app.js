$(document).ready(function(){
	//set global variables
	var a1 = 0, a2 =0,a3 = 0, a4 = 0, a5 = 0, a6 = 0, a7 = 0, a8 = 0, a9 = 0, a10 = 0;
	var scoreArray = [];
	var userName;
    var userPhoto;
    //on click value capture for survey
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
	//on click submit button from home
	$("#toSurvey").on("click", function(){
		if($("#userPhoto").val()!=='' || $("#userName").val() !== ''){
			userName = $("#userName").val().trim();
			userPhoto = $("#userPhoto").val().trim();	
			sessionStorage.setItem("userName", userName);
			sessionStorage.setItem("userPhoto", userPhoto);		
			$("#userName").val('');
			$("#userPhoto").val('');
			window.location.href="/survey";
			showPhoto();
		}else{
			alert("Please enter user name and a link to your profile photo")
		}	
	});

	function showPhoto(){
		var userPhoto = sessionStorage.getItem("userPhoto");
		var photo = $("<img>").attr("src", userPhoto)
		$("#userDiv").html(photo);
	}
	$("#backToHome").on("click", function(){
		$("#userName").val('');
		$("#userPhoto").val('');
	});

	$("#submitAnswers").on("click", function(){
		var userName = sessionStorage.getItem('userName');
		var userPhoto = sessionStorage.getItem("userPhoto");
		var scoreArray = [a1,a2,a3,a4,a5,a6,a7,a8,a9,a10];
		var animalObject = {
			"name": userName,
			"photo": userPhoto,
			"scores": scoreArray
		};
		console.log(animalObject)

		
		$.post("/api/friends", animalObject, function(){

			

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
	