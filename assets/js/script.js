$("#tosignup").click(function (){
    $("#loginform").slideToggle("slow");
    $("#signupform").delay(400).fadeToggle("slow");
});
$("#tologin").click(function(){
$("#signupform").fadeToggle("fast");
$("#loginform").delay(200).slideToggle("slow");
});