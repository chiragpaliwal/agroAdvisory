const uid = document.getElementById("usid").innerText;
const list = document.getElementById("cropList");
//append list element function
const _appendList= (text,textID,parent)=>{
    const li=document.createElement("li");
    const span = document.createElement("span");
    const spanHidden = document.createElement("span");
    const button = document.createElement("button");
    const content= document.createTextNode(text);
    const contentHidden= document.createTextNode(textID);
    span.appendChild(content);
    spanHidden.appendChild(contentHidden);
    spanHidden.setAttribute("style","display:none");
    button.setAttribute("style","float:right");
    button.textContent="Delete";
    button.className="deleteData";
    button.addEventListener("click",(event)=>{
        const list = document.getElementById("cropList");
        let delnode = event.currentTarget;
        console.log(list);
        console.log(delnode.parentNode);
        console.log(delnode.previousSibling.textContent);
        let data = {id:delnode.previousSibling.textContent};
        let urld =`/users/${uid}/crops/delete`; 
        console.log(`delete:${urld}`);
        console.log(data);
        let options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        };
         fetch(urld,options)
        .then(res => res.json())
        .then(res => {
            //_appendList(res.crops[0].name,res.crops[0]._id,list);
            //console.log(res.crops[0].name);
            console.log(res);
        })
        .catch(error=>console.error(error));
        list.removeChild(delnode.parentNode);
    });
    li.appendChild(span);
    li.appendChild(spanHidden);
    li.appendChild(button);
    parent.appendChild(li);
}

//create list
const _createList = ()=>{
    let urlg =`/users/${uid}/crops`;
    fetch(urlg)
    .then(res => res.json())
    .then(res => {
        if (list.childNodes.length===0){
            for(let i=0;i<res.crops.length;i++)
        {
            _appendList(res.crops[i].crop.name,res.crops[i].crop._id,list);
            //console.log(res.crops[i].crop.name);
        }
            //console.log(list.childNodes.length);
        }
        console.log(list.childNodes.length);
        
    })
    .catch(error=>console.error(error));
}

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
    return await fetch(urlp,options)
    .then(res => res.json())
    .then(res => {
        _appendList(res.crops[0].name,res.crops[0]._id,list);
        console.log(res.crops[0].name);
        console.log(res.crops[0]._id);
    })
    .catch(error=>console.error(error));
});

$(".deleteData").click(event=>{
    let delnode = event.currentTarget;
    console.log(list);
    console.log(delnode.parentNode);
    list.removeChild(delnode.parentNode);

})

$("#initCrop").click(event=>{
    _createList();
});

// $(".pcroplist").click((event)=>{
//     let now = event.currentTarget
//     console.log(now.childNodes);
//     console.log(now);

// });


// SEARCH 

function search() {
    console.log("inside my func");
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("span")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
}