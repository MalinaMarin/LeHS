var username = localStorage.getItem("username");
var coins = localStorage.getItem("user_coins");
var xp = localStorage.getItem("user_xp");
function user_populate() {
    
    var name = document.getElementById("menu_btn")
    var c = document.getElementById("coins");
    var e = document.getElementById("exp");

    name.textContent = username;
    c.textContent = coins + " coins";
    e.textContent = xp + " xp";

};
