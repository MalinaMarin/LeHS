var username = window.localStorage.getItem("username");
var coins = window.localStorage.getItem("user_coins");
var xp = window.localStorage.getItem("user_xp");
function header_populate() {
    
    var name = document.getElementById("menu_btn")
    var c = document.getElementById("coins");
    var e = document.getElementById("exp");

    name.textContent = username;
    c.textContent = coins + " coins";
    e.textContent = xp + " xp";

};
