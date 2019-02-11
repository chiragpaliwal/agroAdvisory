const uid = document.getElementById("usid").innerText;
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
    let urlg =`/users/${uid}/crops`;
    fetch(urlg).then(res => res.json()).then(res => console.log(res)).catch(error=>console.error(error));
});

$("#tohome").click(function () {
    $(".profile").fadeOut("fast");    
    $(".crops").fadeOut("fast");
    $(".home").delay(200).fadeIn();
});


$( ".cid" ).click(async function( event ) {
    
    let thisVal=event.currentTarget.children[0].textContent;
    console.log(thisVal);
    console.log(uid);
    console.log(thisVal);
    let data = {id:thisVal};
    let urlp =`/users/${uid}/crops/new`; 
  
    console.log(`post:${urlp}`);
    console.log(data);
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    };
    return await fetch(urlp,options).then(res => res.json()).then(res => console.log(res)).catch(error=>console.error(error));
});

$("#cropList").click((event)=>{
    let now = event.currentTarget;
    console.log(now);
});

$(".pcroplist").click((event)=>{
    let now = event.currentTarget
    console.log(now.childNodes);

});