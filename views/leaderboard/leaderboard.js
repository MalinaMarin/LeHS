localStorage.setItem("user_coins", 50);
localStorage.setItem("user_xp", 150);
localStorage.setItem("user_level", 3);

function status(response) {
    if (response.status === 200) {
        return Promise.resolve(response);
    }

    else {
        console.log(response);
        return Promise.reject(new Error("An unexpected error occured"))
    }
}

let data;
const urll = "http://localhost:5000/get/leaderboard"

async function getData() {
    await fetch(urll)
        .then(status)
        .then((res) => res.json())
        .then((response) => { console.log(response); data = response; })
}

async function getLeaderboard() {
    await getData();
    for (var i = 0; i < data.length; i++) {
        document.getElementById(i + 1).innerHTML = "<div class=\"username\">" + data[i].player.username + "</div><div class=\"score\">" + data[i].player.xp + "xp</div>"
    }
    let percentage = (localStorage.getItem("user_level") - 1) * 10;
    let percentage_line = localStorage.getItem("user_xp") * 100 / 550;
    document.getElementById("progress-number").innerHTML = percentage + "<span>%</span>";
    document.getElementById("coins-number").textContent = localStorage.getItem("user_coins") + " coins";
    document.getElementById("xp-number").textContent = localStorage.getItem("user_xp") + " XP";
    document.getElementById("line").style.backgroundImage = "linear-gradient(90deg, var(--pink) " + percentage_line + "%, var(--light-pink) " + (100 - percentage_line) + "%)";
    if (percentage < 50) {
        var calc = 2 * 3.14 * 60 * (100 - percentage) / 100;
        document.getElementById("percentage_circle").style.stroke = "var(--light-pink)";
        document.getElementById("circle").style.stroke = "var(--pink)";
    }
    else {
        var calc = 2 * 3.14 * 60 * percentage / 100;
        document.getElementById("percentage_circle").style.stroke = "var(--pink)";
        document.getElementById("circle").style.stroke = "var(--light-pink)";
    }

    document.getElementById("percentage_circle").style.strokeDasharray = calc;
}