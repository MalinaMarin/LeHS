// localStorage.setItem("user_level", 5);

function status(response) {
    if (response.status === 200) {
        return Promise.resolve(response);
    }
    else if (response.status === 404) {
        console.log(response);
        return Promise.reject(new Error("Levels not found...Please try again later!"))
    }
    else {
        console.log(response);
        return Promise.reject(new Error("An unexpected error occured"))
    }
}

document.getElementById("logout.btn").addEventListener("click",()=>{
    localStorage.clear();
})

const urll = "http://localhost:5000/all/levels"
let data;

async function getData() {
    await fetch(urll)
        .then((res) => res.json())
        .then((response) => { data=response; })
}


async function generateGrid() {
    for (var i = 1; i <= 4; i++) {
        for (var j = 1; j <= 7; j++) {
            var div = document.createElement("DIV");
            document.getElementById("containerLevels").appendChild(div);
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
// var noBtn = 0;
async function addContent(i, j, arrow_direction, level_number) {

    // noBtn++;
    var button = document.createElement("BUTTON");
    button.setAttribute("id", "button_" + level_number);
    if (localStorage.getItem("user_level") > level_number)
        var lock = "unlocked completed"
    else if (localStorage.getItem("user_level") == level_number)
        var lock = "unlocked"
    else
        var lock = "locked"
    button.setAttribute("class", "grid-btn " + lock);
    document.getElementById("grid_" + i + j).appendChild(button);
    var arrow = document.createElement("IMG");
    document.getElementById("button_" + level_number).appendChild(arrow);
    arrow.setAttribute("id", "arrow_" + i + j);
    arrow.setAttribute("class", "arrow");
    if (arrow_direction == "right") {
        arrow.setAttribute("src", "../resources/arrow-right.svg");

    }
    else {
        arrow.setAttribute("src", "../resources/arrow-down.svg");

    }
}

async function loadMap() {
    await getData();
    await generateGrid();

    addContent(1, 1, "right", 1);
    addContent(1, 2, "down", 2);
    addContent(2, 2, "right", 3);
    addContent(2, 3, "right", 4);
    addContent(2, 4, "down", 5);
    addContent(3, 4, "right", 6);
    addContent(3, 5, "right", 7);
    addContent(3, 6, "down", 8);
    addContent(4, 6, "right", 9);
    addContent(4, 7, "right", 10);

    var note = document.getElementById("hide");
    var text = document.getElementById("level-note");


    console.log(data)

    document.getElementById("button_1").addEventListener("click", function () {
        if(document.getElementById("button_1").getAttribute("class")!=="grid-btn locked")
        location.href = "../Play-page/Play-level1.html";
    });
    document.getElementById("button_2").addEventListener("click", function () {
        if(document.getElementById("button_2").getAttribute("class")!=="grid-btn locked")
        location.href = "../Play-page/Play-level2.html";
    });
    document.getElementById("button_3").addEventListener("click", function () {
        if(document.getElementById("button_3").getAttribute("class")!=="grid-btn locked")
        location.href = "../Play-page/Play-level3.html";
    });
    document.getElementById("button_4").addEventListener("click", function () {
        if(document.getElementById("button_4").getAttribute("class")!=="grid-btn locked")
        location.href = "../Play-page/Play-level4.html";
    });
    document.getElementById("button_5").addEventListener("click", function () {
        if(document.getElementById("button_5").getAttribute("class")!=="grid-btn locked")
        location.href = "../Play-page/Play-level5.html";
    });
    document.getElementById("button_6").addEventListener("click", function () {
        if(document.getElementById("button_6").getAttribute("class")!=="grid-btn locked")
        location.href = "../Play-page/Play-level6.html";
    });
    document.getElementById("button_7").addEventListener("click", function () {
        if(document.getElementById("button_7").getAttribute("class")!=="grid-btn locked")
        location.href = "../Play-page/Play-level7.html";
    });
    document.getElementById("button_8").addEventListener("click", function () {
        if(document.getElementById("button_8").getAttribute("class")!=="grid-btn locked")
        location.href = "../Play-page/Play-level8.html";
    });
    document.getElementById("button_9").addEventListener("click", function () {
        if(document.getElementById("button_9").getAttribute("class")!=="grid-btn locked")
        location.href = "../Play-page/Play-level9.html";
    });
    document.getElementById("button_10").addEventListener("click", function () {
        if(document.getElementById("button_10").getAttribute("class")!=="grid-btn locked")
        location.href = "../Play-page/Play-level10.html";
    });

    for (let index = 1; index <= 10; index++) {
        var level = document.getElementById("button_" + index);
        var para;
        level.addEventListener("mouseenter", function () {

            para = document.createElement("P");
            para.innerHTML = "Level: " + data[index - 1].id + " <br>  Exp: " + data[index - 1].xp;
            console.log(data[index - 1].id)
            document.getElementById("level-note").appendChild(para);
            note.style.display = "block";

        });

        level.addEventListener("mouseleave", function () {
            para.remove();
            note.style.display = "none";
        });
    }
}
