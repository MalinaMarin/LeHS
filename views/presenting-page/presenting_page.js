/** whereTo:
                         * 1 - learn page
                         * 2 - practice page
                         * 3 - map page = default
                         * 4 - leaderboard page
                        */
let whereTo = 3; //default

document.getElementById("learn-btn").addEventListener("click", function () {
    whereTo = 1;
    location.href = "../authentification-pages/login.html";
});
document.getElementById("practice-btn").addEventListener("click", function () {
    whereTo = 2;
    location.href = "../authentification-pages/login.html";
});
document.getElementById("play-btn").addEventListener("click", function () {
    whereTo = 3;
    location.href = "../authentification-pages/login.html";
});
document.getElementById("leaderboard-btn").addEventListener("click", function () {
    whereTo = 4;
    location.href = "../authentification-pages/login.html";
});


document.getElementById("learn-responsive").addEventListener("click", function () {
    whereTo = 1;
    location.href = "../authentification-pages/login.html";
});
document.getElementById("practice-responsive").addEventListener("click", function () {
    whereTo = 2;
    location.href = "../authentification-pages/login.html";
});
document.getElementById("play-responsive").addEventListener("click", function () {
    whereTo = 3;
    location.href = "../authentification-pages/login.html";
});
document.getElementById("leaderboard-responsive").addEventListener("click", function () {
    whereTo = 4;
    location.href = "../authentification-pages/login.html";
});
// export { whereTo };
module.exports ={whereTo};


// -------------

let click = 1;
function navResponsive() {
    if (click == 1) {
        document.getElementById("header").style.height = "50%";
        document.getElementById("submenu").style.display = "flex";
        click = 2;
    }
    else {
        document.getElementById("header").style.height = "10%";
        document.getElementById("submenu").style.display = "none";
        click = 1;
    }
}

// -------------

var slideIndex = 0;
    carousel();
    
    function carousel() {
      var i;
      var x = document.getElementsByClassName("slides");
      for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
      }
      slideIndex++;
      if (slideIndex > x.length) {slideIndex = 1}
      x[slideIndex-1].style.display = "block";
      setTimeout(carousel, 1000); // Change image every 2 seconds
    }

// -------------
