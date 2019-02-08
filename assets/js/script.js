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
    $(".profile").fadeToggle("fast");
    $(".crops").delay(200).fadeToggle();
});

$("#toprofile").click(function () {
    $(".crops").fadeToggle("fast");
    $(".profile").delay(200).fadeToggle();
});