$("#tosignup").click(function () {
    $("#loginform").slideToggle("slow");
    $("#signupform").delay(400).fadeToggle("slow");
});
$("#tologin").click(function () {
    $("#signupform").fadeToggle("fast");
    $("#loginform").delay(200).slideToggle("slow");
});

$(".tabs>div").click(function () {
    $(".tabs>div:not(this)").removeClass("tabactive");
    $(this).addClass("tabactive");
});

$("#tocrops").click(function () {
    $(".profile").fadeOut("fast");
    $(".home").fadeOut("fast");
    $(".crops").delay(200).fadeIn();
});

$("#toprofile").click(function () {
    $(".home").fadeOut("fast");
    $(".crops").fadeOut("fast");
    $(".profile").delay(200).fadeIn();
});

$("#tohome").click(function () {
    $(".profile").fadeOut("fast");    
    $(".crops").fadeOut("fast");
    $(".home").delay(200).fadeIn();
});