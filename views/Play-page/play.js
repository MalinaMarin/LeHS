
let correct_answer;
let start_part;
let end_part;
let input;
let submit_clickable = false;
let data;

function status(response) {
    if (response.status === 200) {
        console.log("working!")
        return Promise.resolve(response);
    }
    else if (response.status === 404) {
        console.log(response);
        return Promise.reject(new Error("Ooups...not found!"))
    }
    else {
        console.log(response);
        return Promise.reject(new Error("An unexpected error occured"))
    }
}

async function getData(level) {
    await fetch("http://localhost:5000/get/level" +"?id="+level)
        .then(status)
        .then((res) => res.json())
        .then((response) => { console.log(response); data = response; })
        .catch((err) => alert(err))

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

let sub = document.getElementById("submit");
sub.addEventListener("click", async function (submit_clickable) { 
    console.log(localStorage.getItem("user_id"));
    console.log(data.id);
    if(submit_clickable){
        await fetch("http://localhost:5000/play/submit", {
            "method": "POST",
            "body": JSON.stringify({
                "user_id":localStorage.getItem("user_id"),
                "level_id":data.id
            })
        })
        .then(status)
        .then((res) => res.text())
        .catch((err) => alert(err))
        console.log("Here")
        let current_level = parseInt(localStorage.getItem("user_level"));
        let xp = parseInt(localStorage.getItem("user_xp"));
        xp=xp+data.xp;
        if(current_level == data.id){
            current_level++;
        
        localStorage.setItem("user_level",current_level);
        localStorage.setItem("user_xp",xp);
}

    location.href = "../Level-Map/map.html"; 
}})


let hint = document.getElementById("hint");
hint.addEventListener("click", async function () {
    let coinsHint=data.hint_cost;
    if(coinsHint > localStorage.getItem("user_coins")){
        alert("You do not have enough coins for this!");
        return;
    }
    var texthint = document.getElementById("text-hint");
    texthint.style.visibility = "visible";

    let coins = parseInt(localStorage.getItem("user_coins"));
    coins = coins - coinsHint;
    localStorage.setItem("user_coins",coins);
    await fetch("http://localhost:5000/play/hint", {
    "method": "PUT",
    "body" :JSON.stringify({
        "user_id":localStorage.getItem("user_id"),
        "coins":localStorage.getItem("user_coins")
    })
})
.then(status)
.then((res) => res.json())
.catch((err) => alert(err))

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