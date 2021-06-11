
function user_populate() {
    console.log("hello!");
    document.getElementById("menu_btn").innerHTML = localStorage.getItem("username");
    document.getElementById("coins").innerHTML = localStorage.getItem("user_coins");
    document.getElementById("exp").innerHTML =localStorage.getItem("user_xp");

};