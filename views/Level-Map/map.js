localStorage.setItem("user_level", 5);
function status(response) {
    if (response.status === 200) {
        return Promise.resolve(response);
    }
    else if(response.status === 404) {
        console.log(response);
        return Promise.reject(new Error("Levels not found...Please try again later!"))
    }
    else {
        console.log(response);
        return Promise.reject(new Error("An unexpected error occured"))
    }
}

let data;
const urll = "http://localhost:5000/all/levels"

async function getData() {
    await fetch(urll)
        .then(status)
        .then((res) => res.json())
        .then((response) => { console.log(response); data = response; })
}

function generateGrid() {
    for (var i = 1; i <= 4; i++) {
        for (var j = 1; j <= 7; j++) {
            var div = document.createElement("DIV");
            document.getElementById("container").appendChild(div);
            div.setAttribute("id", ("grid_" + i + j));
            if ((i + j) % 2 == 0) {
                div.setAttribute("class", "cell even");
            }
            else {
                div.setAttribute("class", "cell odd");
            }
        }
    }
}
generateGrid();
var noBtn = 0;
function addContent(i, j, arrow_direction) {
    noBtn++;
    var button = document.createElement("BUTTON");
    button.setAttribute("id", "button_" + noBtn);
    button.setAttribute("class", "grid-btn");
    document.getElementById("grid_" + i + j).appendChild(button);
    var arrow = document.createElement("IMG");
    document.getElementById("button_" + noBtn).appendChild(arrow);
    arrow.setAttribute("id", "arrow_" + i + j);
    arrow.setAttribute("class", "arrow");
    if (arrow_direction == "right") {
        arrow.setAttribute("src", "../resources/arrow-right.svg");

    }
    else {
        arrow.setAttribute("src", "../resources/arrow-down.svg");

    }

}
addContent(1, 1, "right");
addContent(1, 2, "down");
addContent(2, 2, "right");
addContent(2, 3, "right");
addContent(2, 4, "down");
addContent(3, 4, "right");
addContent(3, 5, "right");
addContent(3, 6, "down");
addContent(4, 6, "right");
addContent(4, 7, "right");

document.getElementById("button_1").addEventListener("click",function(){
    location.href="../Play-page/Play-level1.html";
});
document.getElementById("button_2").addEventListener("click",function(){
    location.href="../Play-page/Play-level2.html";
});
document.getElementById("button_3").addEventListener("click",function(){
    location.href="../Play-page/Play-level3.html";
});
document.getElementById("button_4").addEventListener("click",function(){
    location.href="../Play-page/Play-level4.html";
});
document.getElementById("button_5").addEventListener("click",function(){
    location.href="../Play-page/Play-level5.html";
});
document.getElementById("button_6").addEventListener("click",function(){
    location.href="../Play-page/Play-level6.html";
});
document.getElementById("button_7").addEventListener("click",function(){
    location.href="../Play-page/Play-level7.html";
});
document.getElementById("button_8").addEventListener("click",function(){
    location.href="../Play-page/Play-level8.html";
});
document.getElementById("button_9").addEventListener("click",function(){
    location.href="../Play-page/Play-level9.html";
});
document.getElementById("button_10").addEventListener("click",function(){
    location.href="../Play-page/Play-level10.html";
});

async function loadMap(){

var note = document.getElementById("hide");
var text = document.getElementById("level-note");


for (var index = 1; index <= 10; index++) {
    var level = document.getElementById("button_" + index);
    var para;
    level.addEventListener("mouseenter", function () {

        para = document.createElement("P");
        para.innerHTML = "Level: " + data[index-1].id+" <br>  Exp: " + data[index-1].id;
        document.getElementById("level-note").appendChild(para);
        note.style.display = "block";

    });

    level.addEventListener("mouseleave", function () {
        para.remove();
        note.style.display = "none";
    });
}
}