$(document).ready(function(){
    $("#tosignup").click(function () {
        console.log('test');
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
    const uid = document.getElementById("usid").innerText;
const list = document.getElementById("cropList");
const homeCards = document.getElementById("suggestionCards");

const _appendList= (text,textID,parent,key)=>{
    const li=document.createElement("li");
    const span = document.createElement("span");
    const spanHidden = document.createElement("span");
    const keyHidden = document.createElement("span");
    const button = document.createElement("button");
    const content= document.createTextNode(text);
    const contentHidden= document.createTextNode(textID);
    const keyText= document.createTextNode(key);
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
            console.log(res);
        })
        .catch(error=>console.error(error));
        _deleteCards(delnode.previousSibling.textContent,delnode.nextSibling.textContent);
        list.removeChild(delnode.parentNode);
    });
    keyHidden.appendChild(keyText);
    keyHidden.style.display="none";
    li.appendChild(span);
    li.appendChild(spanHidden);
    li.appendChild(button);
    li.appendChild(keyHidden);
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
            _appendList(res.crops[i].crop.name,res.crops[i].crop._id,list,i);
            console.log(res.crops[i].crop.name);
            if(homeCards.childNodes.length<res.crops.length)
            {_createSuggestionCards(homeCards,res.crops[i].crop,i);}
        }
        }
        console.log(list.childNodes.length);

        
    })
    .catch(error=>console.error(error));
}

//create heading span
const _createHeaderSpan = (text,parent)=>{
    const headFour = document.createElement("h4");
    const headText = document.createTextNode(text);
    const span =document.createElement("span");
    headFour.appendChild(headText);
    span.appendChild(headFour);
    parent.appendChild(span);
}
//create span
const _createSpan = (text,parent)=>{
    const span =  document.createElement("span");
    const textLine = document.createTextNode(text);
    const br = document.createElement("br");
    span.appendChild(textLine);
    console.log(span);
    parent.appendChild(span);
    parent.appendChild(br);
}

//create image
const _createImg = (path,parent)=>{
    const cropImg = document.createElement("img");
    cropImg.src = path;
    cropImg.style.height="80px";
    cropImg.style.width="100px";
    cropImg.style.cssFloat="right";
    cropImg.style.borderRadius="0.4em";
    parent.appendChild(cropImg);
}
//create suggestion cards
const _createSuggestionCards = (parent,data,key)=>{
    const suggestCardDiv = document.createElement("div");
    const spanHidden = document.createElement("span");
    const textHidden = document.createTextNode(data._id);
    const keyHidden = document.createElement("span");
    const keyText= document.createTextNode(key);
    console.log(data.name);
    _createHeaderSpan(data.name,suggestCardDiv);
    spanHidden.appendChild(textHidden);
    spanHidden.style.display="none";
    keyHidden.appendChild(keyText);
    keyHidden.style.display="none";
    suggestCardDiv.appendChild(spanHidden);
    suggestCardDiv.appendChild(keyHidden);
    data.suggestions.forEach(element => {
        console.log(element);
        _createSpan(element,suggestCardDiv);
    });
    console.log(data.img);
    _createImg(data.img,suggestCardDiv);
    parent.appendChild(suggestCardDiv);
    console.log(suggestCardDiv);
}
//delete suggestion cards
const _deleteCards = (id,key)=>{
let removeCount=0;
    if(homeCards.hasChildNodes())
    {   for (let i=0;i<homeCards.childNodes.length;i++)
        {   if( id == homeCards.childNodes[i].childNodes[1].textContent && homeCards.childNodes[i].childNodes[2].textContent==key && removeCount===0)
            {
                console.log(homeCards.childNodes[i].childNodes[1].textContent);
                console.log(homeCards.childNodes[i]);
                homeCards.removeChild(homeCards.childNodes[i]);
                removeCount++;
            }
        }
    }
    else{
        console.log(`no child nodes ${homeCards}`);
    }
}

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
    let urlg = `/users/${uid}/crops`;
    fetch(urlg)
    .then(res=>res.json())
    .then(res =>{
        console.log(res.crops);
        if(homeCards.childNodes.length===0){
        for(let i = 0; i<res.crops.length;i++)
        {
            _createSuggestionCards(homeCards,res.crops[i].crop,i);
        }} else {
            console.log(`length exceeded `);
        }
    })
    .catch(error=>console.log(error));
    //_createSuggestionCards(homeCards);
});


$( ".cid" ).click(async function( event ) {
    
    let promise = new Promise(function(resolve,reject){
        try{
            resolve(_createList());
        }
        catch(error){
            reject(new Error(error));
        }      
    });
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
        console.log(`list length:${list.childNodes.length}`);
        if(list.childNodes.length==0){
            promise.then((result) =>{
                console.log(result);
                _appendList(res.crops[0].name,res.crops[0]._id,list,list.childNodes.length);    
            },
            (error)=>{
                console.error(error);
            }
            );
        
        }else{
            _appendList(res.crops[0].name,res.crops[0]._id,list,list.childNodes.length);
        }
        
        _createSuggestionCards(homeCards,res.crops[0],homeCards.childNodes.length);
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
});