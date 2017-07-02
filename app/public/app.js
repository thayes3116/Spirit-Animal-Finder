$(document).ready(function(){   
   //on click submit button from home
    $("#toSurvey").on("click", function() {
        if ($("#userPhoto").val() !== '' || $("#userName").val() !== '') {
            userName = $("#userName").val().trim();
            userPhoto = $("#userPhoto").val().trim();
            sessionStorage.setItem("userName", userName);
            sessionStorage.setItem("userPhoto", userPhoto);
            $("#userName").val('');
            $("#userPhoto").val('');
            window.location.href = "/survey";
            $("#searchlabel").html("Enter Your Information Here");
        } else {
            $("#searchlabel").html("Please enter your name and a link to your profile photo to continue");           
        }
    });
}); 