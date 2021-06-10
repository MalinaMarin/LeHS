var hint=document.getElementById("hint");
hint.addEventListener("click", function (){var texthint=document.getElementById("text-hint");
texthint.style.visibility="visible";
});


var sub=document.getElementById("submit");
sub.addEventListener("click",function(){location.href = "../Level-Map/map.html";})


var run=document.getElementById("run");
// var iframe_page=document.getElementsByTagName("try.html");


run.addEventListener("click",function(){
    
    request = new XMLHttpRequest();
    var code=document.getElementById("code").innerHTML;
    iframedoc = document.getElementById("my_iframe").contentDocument;
    iframedoc.getElementById("code").innerHTML="";
    iframedoc.getElementById("code").innerHTML+=document.getElementById("start").textContent;
    iframedoc.getElementById("code").innerHTML+=document.getElementById("code").value;
    iframedoc.getElementById("code").innerHTML+=document.getElementById("end").textContent;
    
});