
let correct_answer;
let start_part;
let end_part;
let input;
let submit_clickable = false;
let data;

async function getData(level) {
    await fetch("http://localhost:5000/get/level" +"?id="+level)
        .then((res) => res.json())
        .then((response) => { console.log(response); data = response; })
}
async function load(url, level_id) {

    await getData(level_id);
    document.getElementById("hint_coins").textContent = data.hint_cost + " coins";
    var request;
    var q = document.getElementById("instructions");
    var hint = document.getElementById("text-hint");
    var start = document.getElementById("start");
    var end = document.getElementById("end");

    request = new XMLHttpRequest();


    request.addEventListener("readystatechange", function (event) {

        if (this.readyState == 4 && this.status == 200) {

            var json = JSON.parse(this.responseText);
            q.innerHTML = json.question
            hint.innerHTML = json.hint
            start.innerHTML = json.start_part
            end.innerHTML = json.end_part
            correct_answer = json.correct_input;
            start_part = json.start_part;
            end_part = json.end_part;

        }

    });

    request.open("GET", url);
    request.send(null);

};

var sub = document.getElementById("submit");
sub.addEventListener("click", function (submit_clickable) { 
    if(submit_clickable)
    location.href = "../Level-Map/map.html"; })


var hint = document.getElementById("hint");
hint.addEventListener("click", function () {
    var texthint = document.getElementById("text-hint");
    texthint.style.visibility = "visible";
});




var run = document.getElementById("run");
// var iframe_page=document.getElementsByTagName("try.html");


run.addEventListener("click", function () {

    request = new XMLHttpRequest();
    var code = document.getElementById("code").innerHTML;
    iframedoc = document.getElementById("my_iframe").contentDocument;
    iframedoc.getElementById("code").innerHTML = "";
    iframedoc.getElementById("code").innerHTML += document.getElementById("start").textContent;
    iframedoc.getElementById("code").innerHTML += document.getElementById("code").value;
    iframedoc.getElementById("code").innerHTML += document.getElementById("end").textContent;

    input = document.getElementById("code").value;


    let toCheck = start_part.replace(/\s/g, '') + input.replace(/\s/g, '') + end_part.replace(/\s/g, '');

    if (toCheck.replace(/\s/g, '') === correct_answer.replace(/\s/g, '')) {
        submit_clickable = true;
        alert("That's correct. You can click on submit now!")
    }
    else
        alert("Not really...Keep trying!")

});